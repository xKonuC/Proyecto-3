import pool from '../../../dbConnection.js';

class DeleteAcademicHasTitle {
  async deleteAcademicHasTitle(academicHasTitleIDs, userID) {
    const placeholders = academicHasTitleIDs.map(() => '?').join(', ');
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      DELETE FROM academicHasTitle 
      WHERE userID = ? 
      AND academicHasTitleID IN (${placeholders})
    `, [userID, ...academicHasTitleIDs]);
    connection.release();
    return { result };
  }
}

export { DeleteAcademicHasTitle };
