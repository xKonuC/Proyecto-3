const validateExcel = (req, res, next) => {
  if (!req.file) {
    return res.status(409).json({ error: 'No se ha subido ningún archivo' });
  }
  const fileName = req.file.originalname;
  const formatName = fileName.split('.').pop().toLowerCase();
  if (formatName === 'xlsx') {
    next();
  } else {
    return res.status(409).json({ error: 'No se ha subido un archivo válido' });
  }
};

export default validateExcel;
