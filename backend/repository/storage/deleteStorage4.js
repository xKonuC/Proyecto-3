import axios from 'axios';
import dotenv from 'dotenv';
import origin from '../../Origin.js';

dotenv.config();

class DeleteStorage4 {
  async deleteStorage4(url, access_token) {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
        ...origin
      },
    };
    const response = await axios.delete(`${process.env.FILESERVER_URL}/files/${url}`, config);
    return response.data;
  }
}
export { DeleteStorage4 };
