import axios from 'axios';
import origin from '../../../Origin.js';

class UpdatePassword {
  async updatePassword(id, password, access_token) {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`, ...origin,
      },
    };
    const result = await axios.post(`${process.env.AUTHSERVER_URL}/mailer/addPassword`, {
      id, password,
    }, config);
    return result.data;
  }
}

export { UpdatePassword };
