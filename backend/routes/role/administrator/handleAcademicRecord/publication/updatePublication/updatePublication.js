import { UpdatePublication } from '../../../../../../repository/handleAcademicRecord/publication/updatePublication.js';

const updatePublication = async (req, res) => {
  const {
    publicationID, userID, authors, leadAuthor, type, year, isIndexed, title, journal, ISSN, status, accessURL,
  } = req.body;
  const updatePublicationInstance = new UpdatePublication();
  try {
    await updatePublicationInstance.updatePublication(publicationID, userID, authors, leadAuthor, type, year, isIndexed, title, journal, ISSN, status, accessURL);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updatePublication;
