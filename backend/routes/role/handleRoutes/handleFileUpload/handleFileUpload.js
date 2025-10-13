import saveBody from '../../../../validations/storage/saveBody.js';
import upload from '../../../../repository/storage/handleStorage.js';
import validateFile from '../../../../validations/storage/validateFile.js';

export function handleFileUpload(req, res, next) {
  saveBody(req, res, () => {
    upload.single('file')(req, res, (err) => {
      req.body = req.new;
      if (err) {
        return validateFile(req, res, next);
      }
      validateFile(req, res, next);
    });
  });
}
