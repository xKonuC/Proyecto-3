import posgradoPool from '../../../posgradoDbConnection.js';

class SelectSemester {
  async selectSemester() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from semester;
    `);
    connection.release();
    return { result };
  }
}

export { SelectSemester };
