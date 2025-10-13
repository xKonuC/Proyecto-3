import { UpdateDocument } from '../../../../../repository/document/updateDocument.js';

const updateDocument = async (req, res) => {
  const {
    documentID, category,
  } = req.body;
  const updateDocumentInstance = new UpdateDocument();
  try {
    await updateDocumentInstance.updateDocument(documentID, category);
    res.status(200).json({ verificationMessage: 'El documento fue sido actualizado exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateDocument;
