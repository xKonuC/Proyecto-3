import { AuthUser } from '../../../repository/authCases/authUser.js';
import { SearchGraduate } from '../../../repository/authCases/searchGraduate.js';

const signinGraduate = async (req, res) => {
  const { email, password } = req.body;
  const authUserInstance = new AuthUser();
  const searchGraduateInstance = new SearchGraduate();
  try {
    const result = await authUserInstance.authUser(email, password);
    if (result.message === 'Incorrect password') {
      return res.status(403).json({ message: 'Credenciales inválidas' });
    }
    const graduate = await searchGraduateInstance.searchGraduate(result.id);
    if (graduate.length === 0) {
      return res.status(403).json({ errorDenied: 'No tienes permiso para ingresar' });
    }

    res.status(200).json({ result });
  } catch (error) {
    if (error.status === 400) {
      res.status(400).json({ message: 'Credenciales inválidas' });
    } else {
      res.status(500).json({ error });
    }
  }
};

export default signinGraduate;
