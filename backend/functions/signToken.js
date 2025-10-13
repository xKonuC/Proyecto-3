import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const signToken = () => {
  try {
    const token = jwt.sign('data', process.env.SECRET_TOKEN);
    return token;
  } catch (error) {
    throw new Error('Error signing new token');
  }
};
export default signToken;
