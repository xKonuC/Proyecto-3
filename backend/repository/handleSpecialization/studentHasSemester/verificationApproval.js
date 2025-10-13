import pool from '../../../dbConnection.js';

class VerificationApproval {
  async verificationApproval(evaluationTypeID, userID, evaluationStatusID1, evaluationStatusID2) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    SELECT * FROM studentHasSemester WHERE
    evaluationTypeID = ? AND userID = ? AND evaluationStatusID IN (?, ?)
  `, [evaluationTypeID, userID, evaluationStatusID1, evaluationStatusID2]);
    connection.release();
    return result[0];
  }
}

export { VerificationApproval };
