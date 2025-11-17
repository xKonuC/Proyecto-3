import posgradoPool from '../../../posgradoDbConnection.js';

class DeletePublication {
  async deletePublication(publicationIDs, userID) {
    const placeholders = publicationIDs.map(() => '?').join(', ');

    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    delete from publication where userID = ? and publicationID in (${placeholders})
    `, [userID, ...publicationIDs]);
    connection.release();
    return { result };
  }
}

export { DeletePublication };
