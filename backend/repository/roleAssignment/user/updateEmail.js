import axios from 'axios';
import origin from '../../../Origin.js';

class UpdateEmail {
  async updateEmail(id, email, access_token) {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`, ...origin,
      },
    };
    const response = await axios.post(`${process.env.AUTHSERVER_URL}/admin/updateEmail`, {
      id, email,
    }, config);
    return response.data;
  }
}

export { UpdateEmail };
