import pool from '../../../dbConnection.js';

class VerifyStatus {
  async verifyStatus(userID, studentHasSpecializationID, semesterStatusID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from studentHasSpecialization where
    semesterStatusID = ? and userID = ? and studentHasSpecializationID = ?
    `, [semesterStatusID, userID, studentHasSpecializationID]);
    connection.release();
    return { result };
  }
}

export { VerifyStatus };
