import axios from 'axios';
import origin from '../../Origin.js';
// import signTokenData from '../../functions/signTokenData.js';

class GetUserAuth {
  async getUserAuth(token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, ...origin,
      },
    };
    const result = await axios.post(`${process.env.AUTHSERVER_URL}/token/user`, {}, config);
    if (result.data.message && result.data.message.includes('jwt expired')) {
      return null;
    }
    return result.data;
  }
}

export { GetUserAuth };
