import pool from '../../dbConnection.js';

class SearchStudent {
  async searchStudent(id) {
    const connection = await pool.getConnection();
    const [student] = await connection.execute(`
    SELECT * FROM student WHERE userID = ?
`, [id]);
    connection.release();
    return student;
  }
}

export { SearchStudent };
