import { UpdateEmail } from '../../../../../../repository/roleAssignment/user/updateEmail.js';

const updateEmail = async (req, res) => {
  const { userID, email } = req.body;
  const updateEmailInstance = new UpdateEmail();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    await updateEmailInstance.updateEmail(userID, email, access_token);
    res.status(200).json({ verificationMessage: 'El email se actualizó exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateEmail;
