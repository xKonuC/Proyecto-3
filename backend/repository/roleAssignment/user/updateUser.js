import pool from '../../../dbConnection.js';
import { convertToTime } from '../../../utils/convertToTime.js';

class UpdateUser {
  async updateUser(userID, rut, email, personalEmail, firstName, secondName, surname1, surname2, sex, civilStatus, birthday, address, phone, workPlace, phoneWork, job, entry, group, articulation) {
    const formattedBirthday = convertToTime(birthday);
    const connection = await pool.getConnection();
    const [response] = await connection.execute(`
    UPDATE user
    SET rut = ?, email = ?, personalEmail = ?, firstName = ?, secondName = ?, surname1 = ?, surname2 = ?, sex = ?, civilStatus = ?, birthday = ?, address = ?, phone = ?, workPlace = ?, phoneWork = ?, job = ?, entry = ?, \`group\` = ?, articulation = ?
    WHERE userID = ?
    `, [rut, email, personalEmail, firstName, secondName, surname1, surname2, sex, civilStatus, formattedBirthday, address, phone, workPlace, phoneWork, job, entry, group, articulation, userID]);
    connection.release();
    return response.affectedRows;
  }
}

export { UpdateUser };
