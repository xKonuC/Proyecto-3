import pool from '../../../dbConnection.js';

class SelectPreprojectEvaluator {
  async selectPreprojectEvaluator(evaluationID, evaluatorCategoryID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select evaluationID, evaluationStatusID, evaluatorCategoryID, comment1, comment2, comment3, comment4, comment5, comment6, comment7 from preprojectEvaluator
    where evaluationID = ? and evaluatorCategoryID = ?;
    `, [evaluationID, evaluatorCategoryID]);
    connection.release();
    return { result };
  }
}

export { SelectPreprojectEvaluator };
