import pool from '../../../dbConnection.js';

class UpdateEvaluatorAnswer {
  async updateAnswer(evaluatorAnswerID, answer) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update evaluatorAnswer set answer = ?
    where evaluatorAnswerID = ?;
    `, [answer, evaluatorAnswerID]);
    connection.release();
    return { result };
  }
}

export { UpdateEvaluatorAnswer };
