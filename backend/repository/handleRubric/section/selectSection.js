import pool from '../../../dbConnection.js';

class SelectSection {
  async selectSection() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from section;
    `);
    connection.release();
    return { result };
  }
}
// where  isActive = ?;
export { SelectSection };
