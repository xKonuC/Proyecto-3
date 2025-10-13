import { CreatePublication } from '../../../../../../repository/handleAcademicRecord/publication/createPublication.js';

const createPublication = async (req, res) => {
  const {
    userID, authors, leadAuthor, type, year, isIndexed, title, journal, ISSN, status, accessURL,
  } = req.body;
  const createPublicationInstance = new CreatePublication();
  try {
    await createPublicationInstance.createPublication(userID, authors, leadAuthor, type, year, isIndexed, title, journal, ISSN, status, accessURL);
    res.status(200).json({ verificationMessage: 'La Información fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createPublication;
