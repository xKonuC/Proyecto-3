import posgradoPool from '../../../posgradoDbConnection.js';

class SelectTemplate {
  async selectTemplate() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute('select * from template;');
    connection.release();
    return { result };
  }
}

export { SelectTemplate };
