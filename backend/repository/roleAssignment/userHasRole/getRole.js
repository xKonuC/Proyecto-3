import posgradoPool from '../../../posgradoDbConnection.js';

class GetRole {
  async getRole() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute('select * from role;');
    connection.release();
    return { result };
  }
}

export { GetRole };
