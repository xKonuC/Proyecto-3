import axios from 'axios';
import { AuthUser } from '../../../repository/authCases/authUser.js';
import { SearchAdministrative } from '../../../repository/authCases/searchAdministrative.js';

const signinAdministrative = async (req, res) => {
  const { email, password } = req.body;
  const authUserInstance = new AuthUser();
  const searchAdministrativeInstance = new SearchAdministrative();
  try {
    const result = await authUserInstance.authUser(email, password);
    if (result.message === 'Incorrect password') {
      return res.status(403).json({ message: 'Credenciales inválidas' });
    }
    const administrative = await searchAdministrativeInstance.searchAdministrative(result.id);
    if (administrative.length === 0) {
      return res.status(403).json({ errorDenied: 'No tienes permiso para ingresar' });
    }

    res.status(200).json({ result });
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

export default signinAdministrative;
