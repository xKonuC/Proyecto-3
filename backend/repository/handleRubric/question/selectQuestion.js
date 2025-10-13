import pool from '../../../dbConnection.js';

class SelectQuestion {
  async selectQuestion() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('select * from question;');
    connection.release();
    return { result };
  }
}

export { SelectQuestion };
