import pool from '../../dbConnection.js';

class UpdateDocument {
  async updateDocument(documentID, category) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      update document set category = ? where documentID = ?
    `, [category, documentID]);
    connection.release();
    return { result };
  }
}

export { UpdateDocument };
