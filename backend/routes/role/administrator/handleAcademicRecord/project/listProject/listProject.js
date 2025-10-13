import { GetProject } from '../../../../../../repository/handleAcademicRecord/project/getProject.js';

const listProject = async (req, res) => {
  const { userID } = req.body;
  const getProjectInstance = new GetProject();
  try {
    const data = await getProjectInstance.getProject(userID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listProject;
