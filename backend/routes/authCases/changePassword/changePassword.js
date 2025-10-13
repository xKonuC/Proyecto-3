import { UpdatePassword } from '../../../repository/roleAssignment/user/updatePassword.js';
import { GetUserAuth } from '../../../repository/utils/getUserAuth.js';

const changePassword = async (req, res) => {
  const { password } = req.body;
  const updatePasswordInstance = new UpdatePassword();
  const getUserAuth = new GetUserAuth();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    const userAuth = await getUserAuth.getUserAuth(access_token);

    await updatePasswordInstance.updatePassword(userAuth.userID, password, access_token);
    res.status(200).json({ verificationMessage: 'La contraseña se actualizó exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default changePassword;
