import pool from '../../../dbConnection.js';

class SelectSemester {
  async selectSemester() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from semester;
    `);
    connection.release();
    return { result };
  }
}

export { SelectSemester };
