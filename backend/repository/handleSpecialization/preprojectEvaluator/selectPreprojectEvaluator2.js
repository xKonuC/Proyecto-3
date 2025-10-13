import pool from '../../../dbConnection.js';

class SelectPreprojectEvaluator {
  async selectPreprojectEvaluator(evaluationID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select evaluationStatusID, from preprojectEvaluator
    where evaluationID = ? and evaluatorCategoryID = ?;
    `, [evaluationID]);
    connection.release();
    return { result };
  }
}

export { SelectPreprojectEvaluator };
