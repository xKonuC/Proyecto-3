import XLSX from 'xlsx';

const processExcel = (req, res, next) => {
  const excelBuffer = req.file.buffer;
  const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  req.excelData = jsonData;
  next();
};

export default processExcel;
