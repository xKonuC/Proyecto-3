import axios from 'axios';
import signToken from '../../../functions/signToken.js';
import origin from '../../../Origin.js';

class DeleteUser {
  async deleteUser(userID, access_token) {

    const config = {
      headers: {
        'Authorization': 'Bearer ' + access_token, ...origin
      }
    }
    const response = await axios.post(`${process.env.AUTHSERVER_URL}/admin/removeAccount`, {
      id: userID,
    },config);
    return response.data;
  }
}

export { DeleteUser };
