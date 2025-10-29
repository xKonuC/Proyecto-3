import posgradoPool from '../../../posgradoDbConnection.js';

class SelectUniversity {
  async selectUniversity() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from university
    `);
    connection.release();
    return { result };
  }
}

export { SelectUniversity };
