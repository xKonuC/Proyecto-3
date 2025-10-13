import pool from '../../../dbConnection.js';

class UpdateGrade2 {
  async updateGrade2(thesisEvaluatorID, grade2) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      update thesisEvaluator set
      grade2 = ?
      where thesisEvaluatorID = ?
    `, [grade2, thesisEvaluatorID]);
    connection.release();
    return { result };
  }
}

export { UpdateGrade2 };
