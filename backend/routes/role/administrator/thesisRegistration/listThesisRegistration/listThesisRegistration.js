import { SelectThesisRegistration } from '../../../../../repository/handleSpecialization/thesisRegistration/selectThesisRegistration.js';

const listThesisRegistration = async (req, res) => {
  const selectThesisRegistrationInstance = new SelectThesisRegistration();
  try {
    const data = await selectThesisRegistrationInstance.selectThesisRegistration();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listThesisRegistration;
