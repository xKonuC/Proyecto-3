import posgradoPool from '../../../posgradoDbConnection.js';

class CreateTemplateHasQuestion {
  async createTemplateHasQuestion(dataArray) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    insert into templateHasQuestion (questionID, templateHasSectionID, positionNumber) 
    values (?,?,?);
    `, [dataArray.questionID, dataArray.templateHasSectionID, dataArray.positionNumber]);
    connection.release();
    return { result };
  }
}

export { CreateTemplateHasQuestion };
