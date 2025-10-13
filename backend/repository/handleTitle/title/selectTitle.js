import pool from '../../../dbConnection.js';

class SelectTitle {
  async selectTitle() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from title;
    `);
    connection.release();
    return { result };
  }
}

export { SelectTitle };
