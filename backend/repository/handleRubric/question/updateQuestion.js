import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateQuestion {
  async updateQuestion(questionID, question) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update question set question = ?
    where questionID = ?
    `, [question, questionID]);
    connection.release();
    return { result };
  }
}

export { UpdateQuestion };
