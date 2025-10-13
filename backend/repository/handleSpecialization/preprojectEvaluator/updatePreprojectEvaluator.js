import pool from '../../../dbConnection.js';

class UpdatePreprojectEvaluator {
  async updatePreprojectEvaluator(preprojectEvaluatorID, userID) {
    const connection = await pool.getConnection();
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
