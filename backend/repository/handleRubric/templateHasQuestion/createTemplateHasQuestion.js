import pool from '../../../dbConnection.js';

class CreateTemplateHasQuestion {
  async createTemplateHasQuestion(dataArray) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into templateHasQuestion (questionID, templateHasSectionID, positionNumber) 
    values (?,?,?);
    `, [dataArray.questionID, dataArray.templateHasSectionID, dataArray.positionNumber]);
    connection.release();
    return { result };
  }
}

export { CreateTemplateHasQuestion };
