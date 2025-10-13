import axios from 'axios';
import decrypt from '../../functions/decrypt.js';
import origin from '../../Origin.js';
// import signToken from '../../functions/signToken.js';

class RefreshSession {
  async refreshSession(refresh_token) {
    const config = {
      headers: {
        Authorization: `Bearer ${refresh_token}`, ...origin,
      },
    };
    const result = await axios.post(`${process.env.AUTHSERVER_URL}/token/refresh`, {
      refreshToken: refresh_token,
    }, config);
    return decrypt(result.data);
  }
}
export { RefreshSession };
