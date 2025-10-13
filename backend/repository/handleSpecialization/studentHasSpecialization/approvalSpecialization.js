import pool from '../../../dbConnection.js';

class ApprovalSpecialization {
  async approvalSpecialization(userID, specializationID, semesterStatusID, completionSemesterID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update studentHasSpecialization set semesterStatusID = ?, completionSemesterID = ?
    where userID = ? and specializationID = ? 
    `, [semesterStatusID, completionSemesterID, userID, specializationID]);
    connection.release();
    return { result };
  }
}

export { ApprovalSpecialization };
