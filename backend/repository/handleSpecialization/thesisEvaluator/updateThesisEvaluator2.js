import pool from '../../../dbConnection.js';

class UpdateThesisEvaluator {
  async updateThesisEvaluator(thesisEvaluatorID, grade1, comment) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      update thesisEvaluator set
      grade1 = ?, comment = ?
      where thesisEvaluatorID = ?
    `, [grade1, comment, thesisEvaluatorID]);
    connection.release();
    return { result };
  }
}

export { UpdateThesisEvaluator };
