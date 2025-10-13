import pool from '../../../dbConnection.js';

class SelectUser {
  async selectUser() {
    const connection = await pool.getConnection();
    const [response] = await connection.execute('SELECT * FROM user;');
    connection.release();
    return { response };
  }
}

export { SelectUser };
