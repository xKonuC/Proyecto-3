import pool from '../../dbConnection.js';

class GetDocument {
  async getDocument(documentIDs) {
    const placeholders = documentIDs.map(() => '?').join(',');
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    SELECT * FROM document
    WHERE documentID IN (${placeholders})
  `, documentIDs);
    connection.release();
    return result;
  }
}

export { GetDocument };
