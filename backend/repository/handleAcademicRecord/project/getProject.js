import posgradoPool from '../../../posgradoDbConnection.js';

class GetProject {
  async getProject(userID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from project where userID = ?;
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { GetProject };
