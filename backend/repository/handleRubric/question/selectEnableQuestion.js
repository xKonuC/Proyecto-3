import pool from '../../../dbConnection.js';

class SelectEnableQuestion {
  async selectEnableQuestion(isActive = 1) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from question where isActive = ?;
    `, [isActive]);
    connection.release();
    return { result };
  }
}

export { SelectEnableQuestion };
