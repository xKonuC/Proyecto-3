import posgradoPool from '../../../posgradoDbConnection.js';

class CreateThesisEvaluator {
  async createThesisEvaluator(userID, evaluatorCategoryID, evaluationID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
      INSERT INTO thesisEvaluator (userID, evaluatorCategoryID, evaluationID)
      VALUES (?, ?, ?)
    `, [userID, evaluatorCategoryID, evaluationID]);
    connection.release();
    return result.insertId;
  }
}

export { CreateThesisEvaluator };
