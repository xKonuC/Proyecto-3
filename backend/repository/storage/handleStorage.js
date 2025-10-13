import multer from 'multer';

// Configurar Multer para manejar la carga de archivos
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
