import { CreateStudentHasTitle } from '../../../../../../repository/handleTitle/studentHasTitle/createStudentHasTitle.js';

const createStudentHasTitle = async (req, res) => {
  const {
    archiveURL, userID, titleID, formatID, titleYear,
  } = req.body;
  const createStudentHasTitleInstance = new CreateStudentHasTitle();
  try {
    await createStudentHasTitleInstance.createStudentHasTitle(archiveURL, userID, titleID, formatID, titleYear);
    res.status(200).json({ verificationMessage: 'El título fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createStudentHasTitle;
