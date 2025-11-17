import posgradoPool from '../../../posgradoDbConnection.js';

class SelectPreprojectEvaluator {
  async selectPreprojectEvaluator(evaluationID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select evaluationStatusID, from preprojectEvaluator
    where evaluationID = ? and evaluatorCategoryID = ?;
    `, [evaluationID]);
    connection.release();
    return { result };
  }
}

export { SelectPreprojectEvaluator };
