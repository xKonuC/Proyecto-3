import pool from '../../../dbConnection.js';

// Este tiene la diferencia de usar el specializationID en lugar de studentHasSpecializationID, es caso es para estudiantes
class UpdateSemesterStatusID {
  async updateSemesterStatusID(userID, specializationID, semesterStatusID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update studentHasSpecialization set semesterStatusID = ?
    where userID = ? and specializationID = ?
    `, [semesterStatusID, userID, specializationID]);
    connection.release();
    return { result };
  }
}

export { UpdateSemesterStatusID };
