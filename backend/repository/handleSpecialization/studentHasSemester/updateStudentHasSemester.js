/* eslint-disable no-console */
import pool from '../../../dbConnection.js';

class UpdateStudentHasSemester {
  async updateStudentHasSemester(studentHasSemesterID, semesterID, specializationID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(`
        UPDATE studentHasSemester 
        SET semesterID = ?, specializationID = ?
        WHERE studentHasSemesterID = ? 
          AND (evaluationStatusID IS NULL OR evaluationStatusID = 1);
      `, [semesterID, specializationID, studentHasSemesterID]);
      return { result };
    } catch (error) {
      // Manejo del error (puede ser registro de errores, notificación, etc.)
      console.error('Error al actualizar el semestre del estudiante:', error);
      throw error; // Relanza el error para que sea manejado por el código que llama a esta función
    } finally {
      // Siempre liberar la conexión, independientemente de si hubo un error o no
      if (connection) {
        try {
          connection.release();
        } catch (releaseError) {
          console.error('Error al liberar la conexión:', releaseError);
        }
      }
    }
  }
}

export { UpdateStudentHasSemester };
