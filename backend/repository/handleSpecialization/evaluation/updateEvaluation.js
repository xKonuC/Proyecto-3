import pool from '../../../dbConnection.js';

class UpdateEvaluation {
  async updateEvaluation(evaluationID, projectURL, formatID, updateDate, lateMinutes, evaluationStatusID_evaluatorID) {
    let sql = `
      UPDATE evaluation 
      SET projectURL = ?, 
          formatID = ?, 
          updateDate = ?, 
          lateMinutes = ?
    `;

    const params = [projectURL, formatID, updateDate, lateMinutes];

    // If evaluationStatusID_evaluatorID is not null, add it to the SQL and parameters
    if (evaluationStatusID_evaluatorID !== null) {
      sql += ', evaluationStatusID = ?';
      params.push(evaluationStatusID_evaluatorID);
    }

    // Finish constructing the SQL statement
    sql += ' WHERE evaluationID = ?';
    params.push(evaluationID);

    const connection = await pool.getConnection();
    const [result] = await connection.execute(sql, params);
    connection.release();
    return { result };
  }
}

export { UpdateEvaluation };
