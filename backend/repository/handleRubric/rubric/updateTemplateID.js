import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateTemplateID {
  async updateTemplateID(rubricID, templateID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update rubric set templateID = ?
    where rubricID = ?;
    `, [templateID, rubricID]);
    connection.release();
    return { result };
  }
}

export { UpdateTemplateID };
