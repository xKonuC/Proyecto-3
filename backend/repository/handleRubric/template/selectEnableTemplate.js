import posgradoPool from '../../../posgradoDbConnection.js';

class SelectEnableTemplate {
  async selectEnableTemplate(isActive = 1) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from template where isActive = ?;
    `, [isActive]);
    connection.release();
    return { result };
  }
}

export { SelectEnableTemplate };
