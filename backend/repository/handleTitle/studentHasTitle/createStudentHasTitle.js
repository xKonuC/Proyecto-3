import pool from '../../../dbConnection.js';

class CreateStudentHasTitle {
  async createStudentHasTitle(archiveURL, userID, titleID, formatID, titleYear) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into studentHasTitle (archiveURL,userID,formatID,titleID,titleYear)
    values (?,?,?,?,?);
    `, [archiveURL, userID, formatID, titleID, titleYear]);
    connection.release();
    return { result };
  }
}

export { CreateStudentHasTitle };
