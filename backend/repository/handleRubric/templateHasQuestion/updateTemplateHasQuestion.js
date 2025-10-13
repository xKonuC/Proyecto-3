import pool from '../../../dbConnection.js';

class UpdateTemplateHasQuestion {
  async updateTemplateHasQuestion(dataArray) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update templateHasQuestion set
      questionID = ?, positionNumber = ?
    where templateHasQuestionID = ? 
    `, [dataArray.questionID, dataArray.positionNumber, dataArray.templateHasQuestionID]);
    connection.release();
    return { result };
  }
}

export { UpdateTemplateHasQuestion };
