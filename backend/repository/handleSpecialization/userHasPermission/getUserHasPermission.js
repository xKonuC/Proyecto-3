import pool from '../../../dbConnection.js';

class GetUserHasPermission {
  async getUserHasPermission(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    SELECT
      *
    FROM userHasPermission
    WHERE userID = ?
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { GetUserHasPermission };
