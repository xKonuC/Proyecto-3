import posgradoPool from '../../../posgradoDbConnection.js';

class CreatePreprojectEvaluator {
  async createPreprojectEvaluator(userID, evaluatorCategoryID, evaluationID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
      INSERT INTO preprojectEvaluator (userID, evaluatorCategoryID, evaluationID)
      VALUES (?, ?, ?)
    `, [userID, evaluatorCategoryID, evaluationID]);
    connection.release();
    return result.insertId;
  }
}

export { CreatePreprojectEvaluator };
