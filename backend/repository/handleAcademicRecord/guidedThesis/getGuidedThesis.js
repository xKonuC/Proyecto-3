import pool from '../../../dbConnection.js';

class GetGuidedThesis {
  async getGuidedThesis(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from guidedThesis where userID = ?;
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { GetGuidedThesis };
