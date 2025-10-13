import pool from '../../../dbConnection.js';

class UpdateStageAnswer {
  async updateAnswer(stageAnswerID, answer) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update stageAnswer set answer = ?
    where stageAnswerID = ?;
    `, [answer, stageAnswerID]);
    connection.release();
    return { result };
  }
}

export { UpdateStageAnswer };
