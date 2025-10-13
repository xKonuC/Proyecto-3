import pool from '../../../dbConnection.js';

class SelectUserByUserID {
  async selectUserByUserID(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    SELECT * FROM userHasRoles WHERE userID = ?
`, [userID]);
    connection.release();
    return result[0];
  }
}

export { SelectUserByUserID };
