import pool from '../../../dbConnection.js';

class CreateThesisRegistration {
  async createThesisRegistration(studentID, directorID, codirectorID, title) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into thesisRegistration (studentID, directorID, codirectorID, title)
    values (?,?,?,?)
    `, [studentID, directorID, codirectorID, title]);
    connection.release();
    return { result };
  }
}

export { CreateThesisRegistration };
