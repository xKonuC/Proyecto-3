import pool from '../../../dbConnection.js';

class SelectSpecialization {
  async selectSpecialization() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from specialization;
    `);
    connection.release();
    return { result };
  }
}

export { SelectSpecialization };
