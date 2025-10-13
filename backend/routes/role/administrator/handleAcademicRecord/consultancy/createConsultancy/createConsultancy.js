import { CreateConsultancy } from '../../../../../../repository/handleAcademicRecord/consultancy/createConsultancy.js';

const createConsultancy = async (req, res) => {
  const {
    userID, title, contractingInstitution, grantYear, executionPeriod, objective, accessURL,
  } = req.body;
  const createConsultancyInstance = new CreateConsultancy();
  try {
    await createConsultancyInstance.createConsultancy(userID, title, contractingInstitution, grantYear, executionPeriod, objective, accessURL);
    res.status(200).json({ verificationMessage: 'La Información fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createConsultancy;
