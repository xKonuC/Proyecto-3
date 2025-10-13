import pool from '../../../dbConnection.js';

class GetBookChapter {
  async getBookChapter(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from bookChapter where userID = ?;
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { GetBookChapter };
