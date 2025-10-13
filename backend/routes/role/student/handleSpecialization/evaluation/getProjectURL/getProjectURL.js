import { GetProjectURL } from '../../../../../../repository/handleSpecialization/evaluation/getProjectURL.js';

const getProjectURL = async (req, res, next) => {
  const { evaluationID, studentHasSemesterID } = req.body;
  const getProjectURLInstance = new GetProjectURL();
  try {
    req.body.projectURL = await getProjectURLInstance.getProjectURL(evaluationID, studentHasSemesterID);
    next();
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default getProjectURL;
