import pool from '../../../dbConnection.js';

class UpdateThesisGrades {
  async updateThesisGrades(thesisGradesID, finalGrade, grade1, grade2) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      update thesisGrades set
      finalGrade = ?, grade1 = ?, grade2 = ?
      where thesisGradesID = ?
    `, [finalGrade, grade1, grade2, thesisGradesID]);
    connection.release();
    return { result };
  }
}

export { UpdateThesisGrades };
