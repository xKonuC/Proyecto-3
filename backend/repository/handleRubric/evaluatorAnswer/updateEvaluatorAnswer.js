import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateEvaluatorAnswer {
  async updateAnswer(evaluatorAnswerID, answer) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update evaluatorAnswer set answer = ?
    where evaluatorAnswerID = ?;
    `, [answer, evaluatorAnswerID]);
    connection.release();
    return { result };
  }
}

export { UpdateEvaluatorAnswer };
