import pool from '../../../dbConnection.js';

class UpdateThesisRegistration {
  async updateThesisRegistration(thesisRegistrationID, studentID, directorID, codirectorID, title) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update thesisRegistration set
    studentID = ?,
    directorID = ?,
    codirectorID = ?,
    title = ?
    where thesisRegistrationID = ?
    `, [studentID, directorID, codirectorID, title, thesisRegistrationID]);
    connection.release();
    return { result };
  }
}

export { UpdateThesisRegistration };
