import pool from '../../../dbConnection.js';

class SelectEvaluationStatus {
  async selectEvaluationStatus(evaluationStatusIDs) {
    const placeholders = evaluationStatusIDs.map(() => '?').join(', ');
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    SELECT * FROM evaluationStatus WHERE evaluationStatusID IN (${placeholders})
    `, evaluationStatusIDs);
    connection.release();
    return { result };
  }
}

export { SelectEvaluationStatus };
