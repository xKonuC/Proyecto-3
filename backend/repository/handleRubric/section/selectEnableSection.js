import pool from '../../../dbConnection.js';

class SelectEnableSection {
  async selectEnableSection(isActive = 1) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from section where isActive = ?;
    `, [isActive]);
    connection.release();
    return { result };
  }
}

export { SelectEnableSection };
