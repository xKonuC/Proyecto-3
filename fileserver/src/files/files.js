import express from "express";
import multer from "multer";
import path, { dirname } from "path";
import fs from "fs";
import zlib from "zlib";
import { encrypt, decrypt } from "./crypto.js";
import { fileURLToPath } from "url";
import { fileTypeFromBuffer } from 'file-type';
import verifyAccess from "./verifyAccess.js";
import corsOptions from "../../corsOptions.js";
import cors from "cors";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(dirname(__filename), '..');
const rootDirectory = path.resolve(__dirname, '..');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // guardar el archivo en el directorio uploads
        const uploadPath = "uploads/";
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // guardar el archivo agregandole la fecha
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const fileFilter = (req, file, cb) =>{
    const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel', 
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido'), false);
    }
}
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 15
    }
});

const filesRouter = express.Router();

filesRouter.post("/", cors(corsOptions), verifyAccess, (req, res, next) =>{
    upload.single("file")(req, res, (err)=>{
        if(err){
            if(err instanceof multer.MulterError){
                res.status(400).send(`Error de Multer, límite de archivo 50 MB: ${err.message}`);
            }else{
                res.status(400).send(`Error al subir el archivo: ${err.message}`);
            }
        }
        if(!req.file){
            res.status(400).send('No se subió ningún archivo');
        }
        next();

    });
}, (req, res) => {
    try {
        // leer archivo original
        const fileContent = fs.readFileSync(req.file.path);
        // comprimir archivo
        const compressedData = zlib.gzipSync(fileContent);
        // encriptar archivo comprimido
        const encryptedData = encrypt(compressedData);
        const encryptedFileName = `${Date.now()}-${req.file.originalname}.enc`;
        const encryptedFilePath = path.join(rootDirectory, 'uploads', encryptedFileName);
        fs.writeFileSync(encryptedFilePath, encryptedData);
        // eliminar archivo original
        fs.unlinkSync(req.file.path);
        const fileUrl = `${encryptedFileName}`;
        res.json({ url: fileUrl });

    } catch (error) {
        console.log('Error al guardar el archivo', req.file.path);
        res.json({ message: "Error al guardar el archivo", error });
    }
});

filesRouter.get('/download/:filename', (req, res) => {
    try {
        const encryptedFileName = req.params.filename;
        const encryptedFilePath = path.join(rootDirectory, 'uploads', encryptedFileName);
    
        const encryptedData = fs.readFileSync(encryptedFilePath);
        const decryptedData = decrypt(encryptedData);
        const decompressedData = zlib.gunzipSync(decryptedData);
    
        res.setHeader('Content-Disposition', `attachment; filename=${encryptedFileName.replace('.enc', '').replace('.gz', '')}`);
        res.send(decompressedData);            
    } catch (error) {
        console.log('Error al descargar el archivo', req.params.filename);
        res.status(500).json({ error: 'Error al descargar el archivo' });
    }
});


filesRouter.get('/view/:filename', async (req, res) => {
    try {
        const encryptedFileName = req.params.filename;
        const encryptedFilePath = path.join(rootDirectory, 'uploads', encryptedFileName);
        const decompressedFileName = encryptedFileName.replace('.enc', '').replace('.gz', '');

        // Leer el archivo encriptado
        const encryptedData = fs.readFileSync(encryptedFilePath);

        // Desencriptar el archivo
        const decryptedData = decrypt(encryptedData);

        // Descomprimir el archivo
        const decompressedData = zlib.gunzipSync(decryptedData);
        let mimeType = "application/octet-stream";

        if (decompressedFileName.endsWith('.pdf')) {
            mimeType = 'application/pdf';
            res.setHeader('Content-Type', mimeType);
            res.send(decompressedData);    
        }
        else if(decompressedFileName.endsWith('.jpeg') || decompressedFileName.endsWith('.png') ||decompressedFileName.endsWith('.gif')){
            const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
            const imageBuffer = Buffer.from(decompressedData);
            const detectedImageType = await fileTypeFromBuffer(imageBuffer);
            if (detectedImageType && imageMimeTypes.includes(detectedImageType.mime)) {
                mimeType = detectedImageType.mime;
                res.setHeader('Content-Type', mimeType);
                res.send(decompressedData);        
            }
        }else{
            res.setHeader('Content-Disposition', `attachment; filename=${decompressedFileName}`);
            res.send(decompressedData);        
        }


    } catch (error) {
        console.log('Error al visualizar el archivo', req.params.filename);
        res.status(500).json({ error: 'Error al visualizar el archivo' });
    }
});


filesRouter.delete('/:filename', cors(corsOptions), verifyAccess, (req, res) => {
    try {
        const encryptedFileName = req.params.filename;
        const encryptedFilePath = path.join(rootDirectory, 'uploads', encryptedFileName);
    
        fs.unlink(encryptedFilePath, (err) => {
            if (err) {
                console.error(err);
                res.json({ message: 'Error deletting file' });
            } else {
                res.json({ message: 'File deleted' });
            }
        });        
    } catch (error) {
        console.log('Error al eliminar el archivo', req.params.filename);        
    }
});

export default filesRouter;