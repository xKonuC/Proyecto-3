import posgradoPool from '../../../posgradoDbConnection.js';

class UpdatePreprojectEvaluator {
  async updatePreprojectEvaluator(preprojectEvaluatorID, userID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
      update preprojectEvaluator set
      userID = ?
      where preprojectEvaluatorID = ?
    `, [userID, preprojectEvaluatorID]);
    connection.release();
    return { result };
  }
}

export { UpdatePreprojectEvaluator };
