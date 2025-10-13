import pool from '../../../dbConnection.js';

class VerifyStudentHasSpecialization {
  async verifyStudentHasSpecialization(userID, studentHasSpecializationID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      select * from studentHasSpecialization
      where userID  = ? and studentHasSpecializationID = ?
    `, [userID, studentHasSpecializationID]);
    connection.release();
    return result[0];
  }
}

export { VerifyStudentHasSpecialization };
