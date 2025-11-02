import axios from 'axios';
import dotenv from 'dotenv';
import origin from '../../../Origin.js';
import { convertToTime } from '../../../utils/convertToTime.js';

dotenv.config();

class CreateUser {
  async createUser(rut, firstName, secondName, surname1, surname2, sex, civilStatus, birthday, address, email, personalEmail, phone, workPlace, phoneWork, job, entry, group, articulation, access_token) {
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`, ...origin,
      },
    };
    const formattedBirthday = convertToTime(birthday);
    const result = await axios.post(`${process.env.AUTHSERVER_URL}/mailer/invite`, {
      rut, firstName, secondName, surname1, surname2, sex, civilStatus, birthday: formattedBirthday, address, email, personalEmail, phone, workPlace, phoneWork, job, entry, articulation, group,
    }, config);
    return result.data;
  }
}

export { CreateUser };
