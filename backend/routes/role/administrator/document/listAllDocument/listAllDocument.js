import { SelectAllDocument } from '../../../../../repository/document/selectAllDocument.js';

const listAllDocument = async (req, res) => {
  const selectAllDocumentInstance = new SelectAllDocument();
  try {
    const data = await selectAllDocumentInstance.selectAllDocument();
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listAllDocument;
