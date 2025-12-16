import posgradoPool from '../../posgradoDbConnection.js';

class SearchGraduate {
  async searchGraduate(id) {
    const connection = await posgradoPool.getConnection();
    const [graduate] = await connection.execute(`
    SELECT * FROM graduate WHERE userID = ?
`, [id]);
    connection.release();
    return graduate;
  }
}

export { SearchGraduate };
