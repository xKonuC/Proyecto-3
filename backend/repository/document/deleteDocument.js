import pool from '../../dbConnection.js';

class DeleteDocument {
  async deleteDocument(documentIDs) {
    const connection = await pool.getConnection();
    const placeholders = documentIDs.map(() => '?').join(',');
    const [result] = await connection.execute(`
    DELETE FROM document
    WHERE documentID IN (${placeholders})
  `, documentIDs);
    connection.release();
    return { result };
  }
}

export { DeleteDocument };
