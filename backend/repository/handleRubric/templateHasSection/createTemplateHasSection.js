import posgradoPool from '../../../posgradoDbConnection.js';

class CreateTemplateHasSection {
  async createTemplateHasSection(templateID, dataArray) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    insert into templateHasSection (sectionID, positionNumber, templateID) values (?,?,?);
    `, [dataArray.sectionID, dataArray.positionNumber, templateID]);
    connection.release();
    return { result };
  }
}

export { CreateTemplateHasSection };
