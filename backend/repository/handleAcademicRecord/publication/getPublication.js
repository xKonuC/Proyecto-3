import pool from '../../../dbConnection.js';

class GetPublication {
  async getPublication(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from publication where userID = ?;
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { GetPublication };
