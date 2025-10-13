import { ResetPasswordForEmail } from '../../../repository/authCases/resetPasswordForEmail.js';

const recoverPassword = async (req, res) => {
  const { email } = req.body;
  const resetPasswordForEmail = new ResetPasswordForEmail();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    await resetPasswordForEmail.resetPasswordForEmail(email, access_token);
    res.status(200).json({ verificationMessage: 'Correo de restablecimiento de contraseña enviado' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default recoverPassword;
