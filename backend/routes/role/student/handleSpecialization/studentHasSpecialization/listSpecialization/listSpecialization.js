import { SelectSpecialization } from '../../../../../../repository/handleSpecialization/specialization/selectSpecialization.js';

const listSpecialization = async (req, res) => {
  const selectSpecializationInstance = new SelectSpecialization();
  try {
    const data = await selectSpecializationInstance.selectSpecialization();
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listSpecialization;
