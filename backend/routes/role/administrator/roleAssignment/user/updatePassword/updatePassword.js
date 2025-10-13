import { AdminUpdatePassword } from '../../../../../../repository/roleAssignment/user/adminUpdatePassword.js';

const updatePassword = async (req, res) => {
  const { userID, password } = req.body;
  const adminUpdatePasswordInstance = new AdminUpdatePassword();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    await adminUpdatePasswordInstance.adminUpdatePassword(userID, password, access_token);
    res.status(200).json({ verificationMessage: 'La contraseña se actualizó exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updatePassword;
