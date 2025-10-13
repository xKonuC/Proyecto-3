import pool from '../../../dbConnection.js';

class CreateThesisEvaluator {
  async createThesisEvaluator(userID, evaluatorCategoryID, evaluationID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      INSERT INTO thesisEvaluator (userID, evaluatorCategoryID, evaluationID)
      VALUES (?, ?, ?)
    `, [userID, evaluatorCategoryID, evaluationID]);
    connection.release();
    return result.insertId;
  }
}

export { CreateThesisEvaluator };
