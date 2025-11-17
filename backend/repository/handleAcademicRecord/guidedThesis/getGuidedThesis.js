import posgradoPool from '../../../posgradoDbConnection.js';

class GetGuidedThesis {
  async getGuidedThesis(userID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from guidedThesis where userID = ?;
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { GetGuidedThesis };
