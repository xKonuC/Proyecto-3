import pool from '../../../dbConnection.js';

class UpdateRubricHasQuestion {
  async updateRubricHasQuestion(dataArray) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update rubricHasQuestion set
      questionID = ?, positionNumber = ?
    where rubricHasQuestionID = ? 
    `, [dataArray.questionID, dataArray.positionNumber, dataArray.rubricHasQuestionID]);
    connection.release();
    return { result };
  }
}

export { UpdateRubricHasQuestion };
