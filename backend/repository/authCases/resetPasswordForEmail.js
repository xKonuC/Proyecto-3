import axios from 'axios';
import origin from '../../Origin.js';

class ResetPasswordForEmail {
  async resetPasswordForEmail(email, access_token) {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`, ...origin
      },
    };
    const result = await axios.post(
      `${process.env.AUTHSERVER_URL}/mailer/restorePassword`,
      { email },
      config,
    );
    return result.data;
  }
}

export { ResetPasswordForEmail };
