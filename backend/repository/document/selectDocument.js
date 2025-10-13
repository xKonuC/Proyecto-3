import pool from '../../dbConnection.js';

class SelectDocument {
  async selectDocument(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    SELECT
      *,
      (SELECT JSON_OBJECT('name', name) FROM format WHERE format.formatID = document.formatID) AS format
    FROM document
    WHERE userID = ?
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { SelectDocument };
