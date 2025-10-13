import jwt from 'jsonwebtoken';

const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
  } catch (error) {
    throw new Error('Token invalido');
  }
};
export default decodeToken;
