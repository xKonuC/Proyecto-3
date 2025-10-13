import { DeleteProject } from '../../../../../../repository/handleAcademicRecord/project/deleteProject.js';

const deleteProject = async (req, res) => {
  const { projectIDs, userID } = req.body;
  const deleteProjectInstance = new DeleteProject();
  try {
    await deleteProjectInstance.deleteProject(projectIDs, userID);

    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteProject;
