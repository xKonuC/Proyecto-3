import pool from '../../../dbConnection.js';

class SelectEvaluationType {
  async selectEvaluationType() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from evaluationType;
    `);
    connection.release();
    return { result };
  }
}

export { SelectEvaluationType };
