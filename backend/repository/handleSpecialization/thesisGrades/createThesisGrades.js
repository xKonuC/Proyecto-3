import pool from '../../../dbConnection.js';

class CreateThesisGrades {
  async createThesisGrades() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      INSERT INTO thesisGrades (finalGrade, grade1, grade2, grade3)
      VALUES (NULL, NULL, NULL, NULL)
    `);
    connection.release();
    return result.insertId;
  }
}

export { CreateThesisGrades };
