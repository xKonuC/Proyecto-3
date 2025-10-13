import pool from '../../../dbConnection.js';

class UpdateStudentHasTitle {
  async updateStudentHasTitle(studentHasTitleID, titleID, titleYear) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      update studentHasTitle set
        titleID = ?,
        titleYear = ?
      where studentHasTitleID = ?
    `, [titleID, titleYear, studentHasTitleID]);
    connection.release();
    return { result };
  }
}

export { UpdateStudentHasTitle };
