import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv'
import origin from '../../Origin.js';
dotenv.config()

class CreateStorage {
  async createStorage(file, access_token) {
    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });
    const config = {
      headers: {
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'multipart/form-data',
        ...origin
      }
    }
    const response = await axios.post(
      `${process.env.FILESERVER_URL}/files`,
      formData, config,
    );
    return response.data.url;
  }
}

export { CreateStorage };
