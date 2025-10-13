import pool from '../../../dbConnection.js';

class UpdateQuestion {
  async updateQuestion(questionID, question) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update question set question = ?
    where questionID = ?
    `, [question, questionID]);
    connection.release();
    return { result };
  }
}

export { UpdateQuestion };
