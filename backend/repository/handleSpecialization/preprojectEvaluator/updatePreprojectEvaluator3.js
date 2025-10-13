import pool from '../../../dbConnection.js';

class UpdatePreprojectEvaluator {
  async updatePreprojectEvaluator(evaluationD, evaluationStatusID) {
    const connection = await pool.getConnection();
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
