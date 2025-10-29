import posgradoPool from '../../../posgradoDbConnection.js';

class DeletePatent {
  async deletePatent(patentIDs, userID) {
    const placeholders = patentIDs.map(() => '?').join(', ');

    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    delete from patent where userID = ? and patentID in (${placeholders})
    `, [userID, ...patentIDs]);
    connection.release();
    return { result };
  }
}

export { DeletePatent };
