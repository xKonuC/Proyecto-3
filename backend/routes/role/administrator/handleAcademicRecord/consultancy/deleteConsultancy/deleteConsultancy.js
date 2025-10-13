import { DeleteConsultancy } from '../../../../../../repository/handleAcademicRecord/consultancy/deleteConsultancy.js';

const deleteConsultancy = async (req, res) => {
  const { consultancyIDs, userID } = req.body;
  const deleteConsultancyInstance = new DeleteConsultancy();
  try {
    await deleteConsultancyInstance.deleteConsultancy(consultancyIDs, userID);

    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteConsultancy;
