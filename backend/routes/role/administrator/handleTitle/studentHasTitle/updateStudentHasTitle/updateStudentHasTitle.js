import { UpdateStudentHasTitle } from '../../../../../../repository/handleTitle/studentHasTitle/updateStudentHasTitle.js';

const updateStudentHasTitle = async (req, res) => {
  const {
    studentHasTitleID, titleID, titleYear,
  } = req.body;
  const updateStudentHasTitleInstance = new UpdateStudentHasTitle();
  try {
    await updateStudentHasTitleInstance.updateStudentHasTitle(studentHasTitleID, titleID, titleYear);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateStudentHasTitle;
