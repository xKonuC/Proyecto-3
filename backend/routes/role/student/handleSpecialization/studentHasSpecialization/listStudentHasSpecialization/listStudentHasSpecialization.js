import { GetStudentHasSpecialization } from '../../../../../../repository/handleSpecialization/studentHasSpecialization/getStudentHasSpecialization.js';

const listStudentHasSpecialization = async (req, res) => {
  const { userID } = req.body;
  const getStudentHasSpecializationInstance = new GetStudentHasSpecialization();
  try {
    const data = await getStudentHasSpecializationInstance.getStudentHasSpecialization(userID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listStudentHasSpecialization;
