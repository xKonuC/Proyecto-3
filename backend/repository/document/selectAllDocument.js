/* eslint-disable import/extensions */
import posgradoPool from '../../posgradoDbConnection.js';

class SelectAllDocument {
  async selectAllDocument() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`SELECT
    documentID,
    category,
    archiveURL,
    userID,
    formatID,
    (SELECT JSON_OBJECT('name', name) FROM format WHERE format.formatID = document.formatID) AS format
  FROM document;
    `);
    connection.release();
    return { result };
  }
}

export { SelectAllDocument };
