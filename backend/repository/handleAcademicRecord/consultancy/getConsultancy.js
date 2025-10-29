import posgradoPool from '../../../posgradoDbConnection.js';

class GetConsultancy {
  async getConsultancy(userID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from consultancy where userID = ?;
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { GetConsultancy };
