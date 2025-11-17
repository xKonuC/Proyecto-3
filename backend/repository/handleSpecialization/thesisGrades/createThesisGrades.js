import posgradoPool from '../../../posgradoDbConnection.js';

class CreateThesisGrades {
  async createThesisGrades() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
      INSERT INTO thesisGrades (finalGrade, grade1, grade2, grade3)
      VALUES (NULL, NULL, NULL, NULL)
    `);
    connection.release();
    return result.insertId;
  }
}

export { CreateThesisGrades };
