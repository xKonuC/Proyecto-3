import pool from '../../../dbConnection.js';

class UpdateEvaluationStatus {
  async updateEvaluationStatus(studentHasSemesterID, evaluationStatusID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update studentHasSemester set
    evaluationStatusID = ?
    where studentHasSemesterID = ?
    `, [evaluationStatusID, studentHasSemesterID]);
    connection.release();
    return { result };
  }
}

export { UpdateEvaluationStatus };
