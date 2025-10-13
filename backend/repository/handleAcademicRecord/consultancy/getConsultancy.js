import pool from '../../../dbConnection.js';

class GetConsultancy {
  async getConsultancy(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from consultancy where userID = ?;
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { GetConsultancy };
