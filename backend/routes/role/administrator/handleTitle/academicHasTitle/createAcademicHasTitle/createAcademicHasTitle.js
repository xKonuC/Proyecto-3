import { CreateAcademicHasTitle } from '../../../../../../repository/handleTitle/academicHasTitle/createAcademicHasTitle.js';

const createAcademicHasTitle = async (req, res) => {
  const {
    archiveURL, titleYear, studyField, userID, titleID, formatID,
  } = req.body;
  const createAcademicHasTitleInstance = new CreateAcademicHasTitle();
  try {
    await createAcademicHasTitleInstance.createAcademicHasTitle(archiveURL, titleYear, studyField, userID, titleID, formatID);
    res.status(200).json({ verificationMessage: 'El título fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createAcademicHasTitle;
