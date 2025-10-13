import { DeleteDocument } from '../../../../../repository/document/deleteDocument.js';
import { deleteFiles } from '../../../handleRoutes/deleteFiles/deleteFiles.js';

const deleteDocument = async (req, res) => {
  const { documentIDs } = req.body;
  const deleteDocumentInstance = new DeleteDocument();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];

    await deleteFiles(documentIDs, access_token);
    await deleteDocumentInstance.deleteDocument(documentIDs);

    res.status(200).json({ verificationMessage: 'El documento se ha eliminado exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default deleteDocument;
