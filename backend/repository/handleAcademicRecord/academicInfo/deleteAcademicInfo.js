import pool from '../../../dbConnection.js';

class DeleteAcademicInfo {
  async deleteAcademicInfo(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    delete from academicInfo where userID = ?
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { DeleteAcademicInfo };
