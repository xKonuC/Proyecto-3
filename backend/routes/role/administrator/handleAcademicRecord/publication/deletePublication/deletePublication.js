import { DeletePublication } from '../../../../../../repository/handleAcademicRecord/publication/deletePublication.js';

const deletePublication = async (req, res) => {
  const { publicationIDs, userID } = req.body;
  const deletePublicationInstance = new DeletePublication();
  try {
    await deletePublicationInstance.deletePublication(publicationIDs, userID);

    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deletePublication;
