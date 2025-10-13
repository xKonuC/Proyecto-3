import pool from '../../../dbConnection.js';

class GetProjectURL {
  async getProjectURL(evaluationID, studentHasSemesterID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      select * from evaluation where evaluationID = ? and studentHasSemesterID = ?;
    `, [evaluationID, studentHasSemesterID]);
    connection.release();
    return result[0].projectURL;
  }
}

export { GetProjectURL };
