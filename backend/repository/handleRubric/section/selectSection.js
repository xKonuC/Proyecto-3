import posgradoPool from '../../../posgradoDbConnection.js';

class SelectSection {
  async selectSection() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from section;
    `);
    connection.release();
    return { result };
  }
}
// where  isActive = ?;
export { SelectSection };
