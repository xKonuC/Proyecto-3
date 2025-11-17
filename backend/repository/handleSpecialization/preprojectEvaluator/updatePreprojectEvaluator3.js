import posgradoPool from '../../../posgradoDbConnection.js';

class UpdatePreprojectEvaluator {
  async updatePreprojectEvaluator(evaluationD, evaluationStatusID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
      update preprojectEvaluator set
      evaluationStatusID = ?
      where evaluationD = ?
    `, [evaluationStatusID, evaluationD]);
    connection.release();
    return { result };
  }
}

export { UpdatePreprojectEvaluator };
