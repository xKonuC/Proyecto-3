import posgradoPool from '../../posgradoDbConnection.js';

class SearchStudent {
  async searchStudent(id) {
    const connection = await posgradoPool.getConnection();
    const [student] = await connection.execute(`
    SELECT * FROM student WHERE userID = ?
`, [id]);
    connection.release();
    return student;
  }
}

export { SearchStudent };
