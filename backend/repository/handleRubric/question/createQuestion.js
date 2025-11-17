import posgradoPool from '../../../posgradoDbConnection.js';

class CreateQuestion {
  async createQuestion(question) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    insert into question (question) values (?);
    `, [question]);
    connection.release();
    return { result };
  }
}

export { CreateQuestion };
