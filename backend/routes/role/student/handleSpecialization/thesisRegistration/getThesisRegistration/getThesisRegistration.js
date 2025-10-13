import { GetThesisRegistration } from '../../../../../../repository/handleSpecialization/thesisRegistration/getThesisRegistration.js';

const getThesisRegistration = async (req, res) => {
  const { userID } = req.body;
  const getThesisRegistrationInstance = new GetThesisRegistration();
  try {
    const data = await getThesisRegistrationInstance.getThesisRegistration(userID);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default getThesisRegistration;
