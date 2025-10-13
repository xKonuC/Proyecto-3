import { UpdatePatent } from '../../../../../../repository/handleAcademicRecord/patent/updatePatent.js';

const updatePatent = async (req, res) => {
  const {
    patentID, userID, inventors, patentName, applicationDate, publicationDate, registrationNumber, status, accessURL,
  } = req.body;
  const updatePatentInstance = new UpdatePatent();
  try {
    await updatePatentInstance.updatePatent(patentID, userID, inventors, patentName, applicationDate, publicationDate, registrationNumber, status, accessURL);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updatePatent;
