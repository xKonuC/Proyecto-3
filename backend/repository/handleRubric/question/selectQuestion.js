import posgradoPool from '../../../posgradoDbConnection.js';

class SelectQuestion {
  async selectQuestion() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute('select * from question;');
    connection.release();
    return { result };
  }
}

export { SelectQuestion };
