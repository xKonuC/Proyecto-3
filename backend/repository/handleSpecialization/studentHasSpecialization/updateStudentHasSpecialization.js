import pool from '../../../dbConnection.js';

class UpdateStudentHasSpecialization {
  async updateStudentHasSpecialization(studentHasSpecializationID, specializationID, entrySemesterID, userID) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(`
        UPDATE studentHasSpecialization 
        SET specializationID = ?, entrySemesterID = ?
        WHERE userID = ? AND studentHasSpecializationID = ? AND (semesterStatusID = 1 OR semesterStatusID = 5);
      `, [specializationID, entrySemesterID, userID, studentHasSpecializationID]);
      return { result };
    } catch (error) {
      // Manejo del error (puede ser registro de errores, notificación, etc.)
      console.error('Error al actualizar la especialización del estudiante:', error);
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

export { UpdateStudentHasSpecialization };
