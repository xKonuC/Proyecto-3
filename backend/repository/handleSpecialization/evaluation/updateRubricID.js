import pool from '../../../dbConnection.js';

class UpdateRubricID {
  async updateRubricID(evaluationID, rubricID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update evaluation set rubricID = ?
    where evaluationID = ?;
    `, [rubricID, evaluationID]);
    connection.release();
    return { result };
  }
}

export { UpdateRubricID };
