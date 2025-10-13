import { DeleteAcademicHasTitle } from '../../../../../../repository/handleTitle/academicHasTitle/deleteAcademicHasTitle.js';
import { deleteFiles3 } from '../../../../handleRoutes/deleteFiles/deleteFiles3.js';

const deleteAcademicHasTitle = async (req, res) => {
  const { academicHasTitleIDs, userID } = req.body;
  const deleteAcademicHasTitleInstance = new DeleteAcademicHasTitle();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    await deleteFiles3(academicHasTitleIDs, access_token);
    await deleteAcademicHasTitleInstance.deleteAcademicHasTitle(academicHasTitleIDs, userID);

    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteAcademicHasTitle;
