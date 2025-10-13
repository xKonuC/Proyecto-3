import pool from '../../../dbConnection.js';

class UpdateUserID {
  async updateUserID(dataArray) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update rubric set userID = ?
    where rubricID = ?
    `, [dataArray.userID, dataArray.rubricID]);
    connection.release();
    return { result };
  }
}

export { UpdateUserID };
