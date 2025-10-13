/* eslint-disable no-console */
import pool from '../../../dbConnection.js';

class CreateStudentHasSpecialization {
  async createStudentHasSpecialization(userID, specializationID, entrySemesterID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(`
        INSERT INTO studentHasSpecialization (userID, specializationID, entrySemesterID) VALUES (?, ?, ?)
      `, [userID, specializationID, entrySemesterID]);
      return { result };
    } catch (error) {
      // Manejo del error (puede ser registro de errores, notificación, etc.)
      console.error('Error al crear el estudiante con especialización:', error);
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

export { CreateStudentHasSpecialization };
