import { UpdateAcademicHasTitle } from '../../../../../../repository/handleTitle/academicHasTitle/updateAcademicHasTitle.js';
import { deleteFiles3 } from '../../../../handleRoutes/deleteFiles/deleteFiles3.js';

const updateAcademicHasTitle = async (req, res) => {
  const {
    academicHasTitleID, userID, titleID, titleYear, studyField, archiveURL, formatID,
  } = req.body;
  const updateAcademicHasTitleInstance = new UpdateAcademicHasTitle();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    await deleteFiles3([academicHasTitleID], access_token);
    await updateAcademicHasTitleInstance.updateAcademicHasTitle(academicHasTitleID, userID, titleID, titleYear, studyField, archiveURL, formatID);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateAcademicHasTitle;
