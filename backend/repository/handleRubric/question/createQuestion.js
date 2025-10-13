import pool from '../../../dbConnection.js';

class CreateQuestion {
  async createQuestion(question) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into question (question) values (?);
    `, [question]);
    connection.release();
    return { result };
  }
}

export { CreateQuestion };
