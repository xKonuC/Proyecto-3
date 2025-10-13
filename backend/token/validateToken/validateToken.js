import querystring from 'querystring';
import decodeToken from '../decodeToken/decodeToken.js';

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) { return res.status(401).json({ message: 'No se proporcionó el token' }); }

  try {
    // eslint-disable-next-line no-unused-vars
    const decoded = decodeToken(token);
    const parsedQuery = querystring.parse(req.headers['x-data']);

    req.body = {
      ...req.body,
      ...parsedQuery, // Añadir los datos de la cadena de consulta
    };
    req.access_token = token;
    next();
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return res.status(401).json({ expirationError: 'El token es inválido' });
  }
};

export default validateToken;
