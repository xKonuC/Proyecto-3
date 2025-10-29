import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateRubricHasQuestion {
  async updateRubricHasQuestion(dataArray) {
    const connection = await posgradoPool.getConnection();
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
