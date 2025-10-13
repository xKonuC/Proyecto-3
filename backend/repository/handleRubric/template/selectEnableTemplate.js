import pool from '../../../dbConnection.js';

class SelectEnableTemplate {
  async selectEnableTemplate(isActive = 1) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from template where isActive = ?;
    `, [isActive]);
    connection.release();
    return { result };
  }
}

export { SelectEnableTemplate };
