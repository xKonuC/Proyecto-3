import posgradoPool from '../../../posgradoDbConnection.js';

class UpdatePreprojectEvaluator {
  async updatePreprojectEvaluator(preprojectEvaluatorID, evaluationStatusID, comment) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
      update preprojectEvaluator set
      evaluationStatusID = ?, comment = ?
      where preprojectEvaluatorID = ?
    `, [evaluationStatusID, comment, preprojectEvaluatorID]);
    connection.release();
    return { result };
  }
}

export { UpdatePreprojectEvaluator };
