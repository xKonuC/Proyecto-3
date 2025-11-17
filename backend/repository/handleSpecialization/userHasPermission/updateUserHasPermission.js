import posgradoPool from '../../../posgradoDbConnection.js';
import { convertToTime } from '../../../utils/convertToTime.js';

class UpdateUserHasPermission {
  async updateUserHasPermission(userHasPermissionID, dueDate) {
    const formattedDueDate = convertToTime(dueDate);
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
      update userHasPermission set dueDate = ? where userHasPermissionID = ?
    `, [formattedDueDate, userHasPermissionID]);
    connection.release();
    return { result };
  }
}

export { UpdateUserHasPermission };
