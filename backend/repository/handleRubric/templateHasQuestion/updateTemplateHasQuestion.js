import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateTemplateHasQuestion {
  async updateTemplateHasQuestion(dataArray) {
    const connection = await posgradoPool.getConnection();
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
