import { CreatePatent } from '../../../../../../repository/handleAcademicRecord/patent/createPatent.js';

const createPatent = async (req, res) => {
  const {
    userID, inventors, patentName, applicationDate, publicationDate, registrationNumber, status, accessURL,
  } = req.body;
  const createPatentInstance = new CreatePatent();
  try {
    await createPatentInstance.createPatent(userID, inventors, patentName, applicationDate, publicationDate, registrationNumber, status, accessURL);
    res.status(200).json({ verificationMessage: 'La Información fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createPatent;
