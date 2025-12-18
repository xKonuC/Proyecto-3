import { UpdatePassword } from '../../../../../../repository/roleAssignment/user/updatePassword.js';

const updatePassword = async (req, res) => {
  const { userID, password } = req.body;
  const updatePasswordInstance = new UpdatePassword();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    await updatePasswordInstance.updatePassword(userID, password, access_token);
    res.status(200).json({ verificationMessage: 'La contraseña se actualizó exitosamente' });
  } catch (error) {
    if (error.response && error.response.status) {
        res.status(error.response.status).json(error.response.data);
    } else if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error: error.message || error });
    }
  }
};
export default updatePassword;
