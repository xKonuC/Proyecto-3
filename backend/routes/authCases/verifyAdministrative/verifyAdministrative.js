import { GetUserAuth } from '../../../repository/utils/getUserAuth.js';
import { SearchAdministrative } from '../../../repository/authCases/searchAdministrative.js';

const verifyAdministrative = async (req, res) => {
  const header = req.header('Authorization') || '';
  const access_token = header.split(' ')[1];
  const getUserAuthInstance = new GetUserAuth();
  const searchAdministrativeInstance = new SearchAdministrative();

  try {
    const user = await getUserAuthInstance.getUserAuth(access_token);
    if (!user) return res.status(400).json({ error: 'Credenciales inválidas: El token de acceso es incorrecto' });
    const administrative = await searchAdministrativeInstance.searchAdministrative(user.userID);
    if (administrative.length === 0) return res.status(403).json({ errorDenied: 'No tienes permiso para ingresar' });
    res.status(200).json({ access_token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default verifyAdministrative;
