import pool from '../../../dbConnection.js';

class UpdateAcademicHasTitle {
  async updateAcademicHasTitle(academicHasTitleID, userID, titleID, titleYear, studyField, archiveURL, formatID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      UPDATE academicHasTitle SET 
        titleID = ?, 
        studyField = ?,
        titleYear = ?,
        archiveURL = ?,
        formatID = ?
      WHERE academicHasTitleID = ? AND userID = ?;
    `, [titleID, studyField, titleYear, archiveURL, formatID, academicHasTitleID, userID]);
    connection.release();
    return { result };
  }
}

export { UpdateAcademicHasTitle };
