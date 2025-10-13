import axios from 'axios';
import { AuthUser } from '../../../repository/authCases/authUser.js';

const signin = async (req, res) => {
  const { email, password } = req.body;
  const authUser = new AuthUser();
  try {
    const result = await authUser.authUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          return res.status(401).json({ message: 'Credenciales inválidas' });
        } if (error.response.status === 404) {
          return res.status(404).json({ message: 'Usuario no existe' });
        }
        return res.status(400).json({ message: 'Error al Iniciar Sesión' });
      }
    }
    if (error.status === 400) {
      res.status(400).json({ message: 'Credenciales inválidas' });
    } else {
      res.status(500).json({ error });
    }
  }
};

export default signin;
