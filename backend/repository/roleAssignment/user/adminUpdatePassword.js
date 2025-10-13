import axios from 'axios';
import origin from '../../../Origin.js';

class AdminUpdatePassword {
  async adminUpdatePassword(id, password, access_token) {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`, ...origin,
      },
    };
    const result = await axios.post(`${process.env.AUTHSERVER_URL}/admin/addPassword`, {
      id, password,
    }, config);
    return result.data;
  }
}

export { AdminUpdatePassword };
