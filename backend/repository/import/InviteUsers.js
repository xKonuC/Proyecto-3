import axios from 'axios';
import origin from '../../Origin.js';

class InviteUsers {
  async inviteUsers(excelData, access_token) {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`, ...origin,
      },
    };
    const response = await axios.post(
      `${process.env.AUTHSERVER_URL}/auth/mailer/invite`,
      excelData,
      config,
    );
    return response.data;
  }
}

export { InviteUsers };
