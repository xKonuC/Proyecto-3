import { CreateProject } from '../../../../../../repository/handleAcademicRecord/project/createProject.js';

const createProject = async (req, res) => {
  const {
    userID, title, type, fundingSource, grantYear, executionPeriod, role, accessURL,
  } = req.body;
  const createProjectInstance = new CreateProject();
  try {
    await createProjectInstance.createProject(userID, title, type, fundingSource, grantYear, executionPeriod, role, accessURL);
    res.status(200).json({ verificationMessage: 'La Información fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createProject;
