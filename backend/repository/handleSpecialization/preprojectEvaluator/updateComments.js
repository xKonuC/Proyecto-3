import pool from '../../../dbConnection.js';

class UpdateComments {
  async updateComments(preprojectEvaluatorID, userID, evaluationStatusID, comment1, comment2, comment3, comment4, comment5, comment6, comment7) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    UPDATE preprojectEvaluator 
    SET evaluationStatusID = ?, comment1 = ?, comment2 = ?, comment3 = ?, comment4 = ?, comment5 = ?, comment6 = ?, comment7 = ? 
    WHERE preprojectEvaluatorID = ? AND userID = ?
    `, [evaluationStatusID, comment1, comment2, comment3, comment4, comment5, comment6, comment7, preprojectEvaluatorID, userID]);
    connection.release();
    return { result };
  }
}

export { UpdateComments };
