import pool from '../../../dbConnection.js';

class UpdateThesisEvaluator {
  async updateThesisEvaluator(thesisEvaluatorID, userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      update thesisEvaluator set
      userID = ?
      where thesisEvaluatorID = ?
    `, [userID, thesisEvaluatorID]);
    connection.release();
    return { result };
  }
}

export { UpdateThesisEvaluator };
