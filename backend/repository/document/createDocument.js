/* eslint-disable import/extensions */
import pool from '../../dbConnection.js';

class CreateDocument {
  async createDocument(archiveURL, userID, formatID, category) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into document (archiveURL, userID, formatID, category) values
    (?,?,?,?)
    `, [archiveURL, userID, formatID, category]);
    connection.release();
    return { result };
  }
}

export { CreateDocument };
