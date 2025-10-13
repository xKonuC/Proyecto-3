import pool from '../../../dbConnection.js';
import { convertToTime } from '../../../utils/convertToTime.js';

class CreateUserHasPermission {
  async createUserHasPermission(userID, permissionID, dueDate) {
    const formattedDueDate = convertToTime(dueDate);
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into userHasPermission (userID, permissionID, dueDate) values
    (?,?,?)
    `, [userID, permissionID, formattedDueDate]);
    connection.release();
    return { result };
  }
}

export { CreateUserHasPermission };
