/* eslint-disable no-console */
import pool from '../../../../dbConnection.js';

class UpdateStudentHasElective {
  async updateStudentHasElective(studentHasElectiveID, userID, semesterID, electiveID) {
    let connection;
    try {
      connection = await pool.getConnection();
      const [result] = await connection.execute(`
        UPDATE studentHasElective
        SET semesterID = ?, electiveID = ?
        WHERE userID = ? AND studentHasElectiveID = ?;
      `, [semesterID, electiveID, userID, studentHasElectiveID]);
      return { result };
    } catch (error) {
      // Manejo del error (puede ser registro de errores, notificación, etc.)
      console.error('Error al actualizar el registro de estudiante con electiva:', error);
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

export { UpdateStudentHasElective };
