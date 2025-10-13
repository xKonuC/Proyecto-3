import pool from '../../../dbConnection.js';

class VerifyStudentHasSemester {
  async verifyStudentHasSemester(userID, studentHasSemesterID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from studentHasSemester where userID = ? and studentHasSemesterID = ?;
    `, [userID, studentHasSemesterID]);
    connection.release();
    return result[0];
  }
}

export { VerifyStudentHasSemester };
