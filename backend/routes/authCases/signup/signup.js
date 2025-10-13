/* eslint-disable import/extensions */
import { RegisterUser } from '../../../repository/authCases/registerUser.js';
import { SaveUserData } from '../../../repository/authCases/saveUserData.js';

const signup = async (req, res) => {
  const dataBase = req.dataBase;
  const { email, password } = req.body;
  const registerUser = new RegisterUser();
  const saveUserData = new SaveUserData();
  try {
    const userData = await registerUser.registerUser(dataBase, email, password);
    await saveUserData.saveUserData(dataBase, userData.user.id, email);
    res.status(200).json({ verificationMessage: 'Usuario registrado' });
  } catch (error) {
    if (error.code === 23505) {
      res.status(409).json({ message: 'El usuario ya existe' });
    } else if (error.status === 429) {
      res.status(429).json({ message: 'Demasiadas solicitudes por el momento' });
    } else {
      res.status(500).json({ error });
    }
  }
};

export default signup;
