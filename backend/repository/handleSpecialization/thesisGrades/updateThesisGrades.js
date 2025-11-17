import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateThesisGrades {
  async updateThesisGrades(thesisGradesID, finalGrade, grade1, grade2) {
    const connection = await posgradoPool.getConnection();
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
