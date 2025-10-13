import pool from '../../../dbConnection.js';

// Actualización de la nota 3 que representa la nota promedio de la Defensa Oral
class UpdateGrade3 {
  async updateGrade3(thesisGradesID, grade3) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      update thesisGrades set
      grade3 = ?
      where thesisGradesID = ?
    `, [grade3, thesisGradesID]);
    connection.release();
    return { result };
  }
}

export { UpdateGrade3 };
