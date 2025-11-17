import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateSection {
  async updateSection(sectionID, name) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update section set name = ?
    where sectionID = ?
    `, [name, sectionID]);
    connection.release();
    return { result };
  }
}

export { UpdateSection };
