import { UpdateConsultancy } from '../../../../../../repository/handleAcademicRecord/consultancy/updateConsultancy.js';

const updateConsultancy = async (req, res) => {
  const {
    consultancyID, userID, title, contractingInstitution, grantYear, executionPeriod, objective, accessURL,
  } = req.body;
  const updateConsultancyInstance = new UpdateConsultancy();
  try {
    await updateConsultancyInstance.updateConsultancy(consultancyID, userID, title, contractingInstitution, grantYear, executionPeriod, objective, accessURL);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateConsultancy;
