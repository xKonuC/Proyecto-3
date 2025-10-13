import { SignInWithOAuth } from '../../../repository/authCases/signinWithOAuth.js';
import encodeToken from '../../../token/encodeToken/encodeToken.js';

const signinWithGoogleAdministrative = async (req, res) => {
  const signInWithOAuth = new SignInWithOAuth();
  try {
    const data = await signInWithOAuth.signInWithOAuth(true);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default signinWithGoogleAdministrative;
