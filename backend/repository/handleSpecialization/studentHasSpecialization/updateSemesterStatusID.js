import pool from '../../../dbConnection.js';

class UpdateSemesterStatusID {
  async updateSemesterStatusID(userID, studentHasSpecializationID, semesterStatusID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update studentHasSpecialization set semesterStatusID = ?
    where userID = ? and studentHasSpecializationID = ?
    `, [semesterStatusID, userID, studentHasSpecializationID]);
    connection.release();
    return { result };
  }
}

export { UpdateSemesterStatusID };
