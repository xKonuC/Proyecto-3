import { UpdateUniversity } from '../../../../../../repository/handleTitle/university/updateUniversity.js';

const updateUniversity = async (req, res) => {
  const {
    universityID, name, city, country,
  } = req.body;
  const updateUniversityInstance = new UpdateUniversity();
  try {
    await updateUniversityInstance.updateUniversity(universityID, name, city, country);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateUniversity;
