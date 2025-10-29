import posgradoPool from '../../posgradoDbConnection.js';

class UpdateDocument {
  async updateDocument(documentID, category) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
      update document set category = ? where documentID = ?
    `, [category, documentID]);
    connection.release();
    return { result };
  }
}

export { UpdateDocument };
