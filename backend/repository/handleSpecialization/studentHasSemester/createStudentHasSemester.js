/* eslint-disable no-console */
import pool from '../../../dbConnection.js';

class CreateStudentHasSemester {
  async createStudentHasSemester(userID, semesterID, specializationID, evaluationTypeID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(`
        INSERT INTO studentHasSemester (userID, semesterID, specializationID, evaluationTypeID) 
        VALUES (?, ?, ?, ?)
      `, [userID, semesterID, specializationID, evaluationTypeID]);
      return { result };
    } catch (error) {
      // Manejo del error (puede ser registro de errores, notificación, etc.)
      console.error('Error al crear el registro de estudiante y semestre:', error);
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

export { CreateStudentHasSemester };
