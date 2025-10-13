import pool from '../../../dbConnection.js';

class SelectUniversity {
  async selectUniversity() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from university
    `);
    connection.release();
    return { result };
  }
}

export { SelectUniversity };
