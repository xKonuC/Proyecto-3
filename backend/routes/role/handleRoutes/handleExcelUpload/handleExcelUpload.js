import saveBody from '../../../../validations/storage/saveBody.js';
import upload from '../../../../repository/storage/handleStorage.js';
import validateExcel from '../../../../validations/storage/validateExcel.js';

export default function handleExcelUpload(req, res, next) {
  saveBody(req, res, () => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        return validateExcel(req, res, next);
      }
      validateExcel(req, res, next);
    });
  });
}
