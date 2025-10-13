import { UpdateProject } from '../../../../../../repository/handleAcademicRecord/project/updateProject.js';

const updateProject = async (req, res) => {
  const {
    projectID, userID, title, type, fundingSource, grantYear, executionPeriod, role, accessURL,
  } = req.body;
  const updateProjectInstance = new UpdateProject();
  try {
    await updateProjectInstance.updateProject(projectID, userID, title, type, fundingSource, grantYear, executionPeriod, role, accessURL);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateProject;
