import posgradoPool from '../../../posgradoDbConnection.js';

class SelectTitle {
  async selectTitle() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from title;
    `);
    connection.release();
    return { result };
  }
}

export { SelectTitle };
