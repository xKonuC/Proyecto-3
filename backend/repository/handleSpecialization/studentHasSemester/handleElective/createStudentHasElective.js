/* eslint-disable no-console */
import pool from '../../../../dbConnection.js';

class CreateStudentHasElective {
  async createStudentHasElective(userID, semesterID, electiveID) {
    let connection;
    try {
      connection = await pool.getConnection();
      const [result] = await connection.execute(`
        INSERT INTO studentHasElective (userID, semesterID, electiveID) VALUES (?, ?, ?)
      `, [userID, semesterID, electiveID]);
      return { result };
    } catch (error) {
      // Manejo del error (puede ser registro de errores, notificación, etc.)
      console.error('Error al crear el registro de estudiante con electiva:', error);
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

export { CreateStudentHasElective };
