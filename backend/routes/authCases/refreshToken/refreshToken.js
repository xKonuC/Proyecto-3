import { RefreshSession } from '../../../repository/authCases/refreshSession.js';

const refreshToken = async (req, res) => {
  const refreshSession = new RefreshSession();
  const { refresh_token } = req.body;
  try {
    const token = await refreshSession.refreshSession(refresh_token);
    res.status(200).json({ token });
  } catch (error) {
    if (error.status === 400) {
      res.status(400).json({ verificationMessage: 'El token de actualización no es válido o ya ha sido utilizado previamente' });
    } else {
      res.status(500).json({ error });
    }
  }
};

export default refreshToken;
