import { SignInWithOAuth } from '../../../repository/authCases/signinWithOAuth.js';
// import encodeToken from '../../../token/encodeToken/encodeToken.js';

const signinWithGoogle = async (req, res) => {
  const signInWithOAuth = new SignInWithOAuth();
  try {
    const data = await signInWithOAuth.signInWithOAuth(false);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default signinWithGoogle;
