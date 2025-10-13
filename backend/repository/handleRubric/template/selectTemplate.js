import pool from '../../../dbConnection.js';

class SelectTemplate {
  async selectTemplate() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('select * from template;');
    connection.release();
    return { result };
  }
}

export { SelectTemplate };
