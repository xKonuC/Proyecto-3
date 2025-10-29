import posgradoPool from '../../../posgradoDbConnection.js';

class GetPublication {
  async getPublication(userID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from publication where userID = ?;
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { GetPublication };
