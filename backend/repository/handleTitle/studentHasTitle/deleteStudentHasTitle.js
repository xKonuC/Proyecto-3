import pool from '../../../dbConnection.js';

class DeleteStudentHasTitle {
  async deleteStudentHasTitle(studentHasTitleIDs) {
    const placeholders = studentHasTitleIDs.map(() => '?').join(', ');
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    delete from studentHasTitle
    where studentHasTitleID in (${placeholders})
    `, studentHasTitleIDs);
    connection.release();
    return { result };
  }
}

export { DeleteStudentHasTitle };
