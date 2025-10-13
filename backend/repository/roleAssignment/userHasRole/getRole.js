import pool from '../../../dbConnection.js';

class GetRole {
  async getRole() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('select * from role;');
    connection.release();
    return { result };
  }
}

export { GetRole };
