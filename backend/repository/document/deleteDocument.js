import posgradoPool from '../../posgradoDbConnection.js';

class DeleteDocument {
  async deleteDocument(documentIDs) {
    const connection = await posgradoPool.getConnection();
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
