import axios from 'axios';
import dotenv from 'dotenv';
import decrypt from '../../functions/decrypt.js';
import origin from '../../Origin.js';

dotenv.config();

class AuthUser {
  async authUser(email, password) {
    const result = await axios.post(`${process.env.AUTHSERVER_URL}/auth/email/login`, { email, password }, {
      headers: origin,
    });
    return decrypt(result.data);
  }
}

export { AuthUser };
