import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateTemplate {
  async updateTemplate(templateID, name, description) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update template set name = ?, description = ?
    where templateID = ?;
    `, [name, description, templateID]);
    connection.release();
    return { result };
  }
}

export { UpdateTemplate };
