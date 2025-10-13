import {
  express,
  handleFileUpload,
  uploadArchiveToBucket,
  listAllDocument,
  listDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  validateUserID,
  validateDocumentID,
  validateArrayDocumentID,
  validateCategory,
} from './document.modules.js';

const documentRoute = express.Router();

documentRoute.get('/documents', listAllDocument);
documentRoute.route('/')
  .get(validateUserID, listDocument)
  .post(
    // validateCategory, 
    validateUserID, 
    handleFileUpload, 
    uploadArchiveToBucket, 
    createDocument)
    .put(
      // validateCategory, 
      validateDocumentID, 
      updateDocument)
  .delete(validateArrayDocumentID, deleteDocument);
export default documentRoute;
