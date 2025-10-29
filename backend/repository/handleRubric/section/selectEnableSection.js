import posgradoPool from '../../../posgradoDbConnection.js';

class SelectEnableSection {
  async selectEnableSection(isActive = 1) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from section where isActive = ?;
    `, [isActive]);
    connection.release();
    return { result };
  }
}

export { SelectEnableSection };
