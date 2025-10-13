import pool from '../../../dbConnection.js';

class UpdatePreprojectEvaluator {
  async updatePreprojectEvaluator(preprojectEvaluatorID, evaluationStatusID, comment) {
    const connection = await pool.getConnection();
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
