import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateStageAnswer {
  async updateAnswer(stageAnswerID, answer) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update stageAnswer set answer = ?
    where stageAnswerID = ?;
    `, [answer, stageAnswerID]);
    connection.release();
    return { result };
  }
}

export { UpdateStageAnswer };
