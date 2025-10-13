import { DeleteUniversity } from '../../../../../../repository/handleTitle/university/deleteUniversity.js';

const deleteUniversity = async (req, res) => {
  const { universityIDs } = req.body;
  const deleteUniversityInstance = new DeleteUniversity();
  try {
    await deleteUniversityInstance.deleteUniversity(universityIDs);

    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteUniversity;
