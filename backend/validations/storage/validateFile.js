import { GetFormat } from '../../repository/utils/getFormat.js';

const validateFile = async (req, res, next) => {
  if (!req.file) {
    return res.status(409).json({ error: 'No se ha subido ningún archivo' });
  }
  const fileName = req.file.originalname;
  const formatName = fileName.split('.').pop().toLowerCase();
  const getFormatInstance = new GetFormat();
  const data = await getFormatInstance.getFormat(formatName);
  if (data) {
    req.body.formatID = data.formatID;
    next();
  } else {
    return res.status(409).json({ error: 'No se ha subido un archivo válido' });
  }
};

export default validateFile;
