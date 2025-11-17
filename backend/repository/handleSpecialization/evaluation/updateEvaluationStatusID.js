import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateEvaluationStatusID {
  async updateEvaluationStatusID(evaluationID, evaluationStatusID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update evaluation set evaluationStatusID = ?
    where evaluationID = ?
    `, [evaluationStatusID, evaluationID]);
    connection.release();
    return { result };
  }
}

export { UpdateEvaluationStatusID };
