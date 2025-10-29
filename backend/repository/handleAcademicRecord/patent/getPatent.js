import posgradoPool from '../../../posgradoDbConnection.js';

class GetPatent {
  async getPatent(userID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from patent where userID = ?;
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { GetPatent };
