import { CreateDocument } from '../../../../../repository/document/createDocument.js';

const createDocument = async (req, res) => {
  const {
    userID, formatID, category, archiveURL,
  } = req.body;
  const createDocumentInstance = new CreateDocument();
  try {
    await createDocumentInstance.createDocument(archiveURL, userID, formatID, category);
    res.status(200).json({ verificationMessage: 'El documento fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createDocument;
