import { DeleteStudentHasTitle } from '../../../../../../repository/handleTitle/studentHasTitle/deleteStudentHasTitle.js';
import { deleteFiles2 } from '../../../../handleRoutes/deleteFiles/deleteFiles2.js';

const deleteStudentHasTitle = async (req, res) => {
  const { studentHasTitleIDs } = req.body;
  const deleteStudentHasTitleInstance = new DeleteStudentHasTitle();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    await deleteFiles2(studentHasTitleIDs, access_token);
    await deleteStudentHasTitleInstance.deleteStudentHasTitle(studentHasTitleIDs);

    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteStudentHasTitle;
