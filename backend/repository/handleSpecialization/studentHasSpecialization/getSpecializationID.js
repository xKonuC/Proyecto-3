/* eslint-disable no-console */
import pool from '../../../dbConnection.js';

class GetSpecializationID {
  async getSpecializationID(userID) {
    const connection = await pool.getConnection();
    try {
      // Ordena los resultados por studentHasSpecializationID de forma descendente y limita a 1
      const [result] = await connection.execute(
        `
        SELECT specializationID
        FROM studentHasSpecialization
        WHERE userID = ?
        ORDER BY studentHasSpecializationID DESC
        LIMIT 1
        `,
        [userID],
      );
      // Devuelve specializationID si se encuentra algún resultado, de lo contrario null
      return result.length > 0 ? result[0].specializationID : null;
    } catch (error) {
      console.error('Error al obtener el specializationID:', error);
      throw error; // Lanzar el error para manejo externo si es necesario
    } finally {
      connection.release(); // Asegura que la conexión siempre se libere
    }
  }
}

export { GetSpecializationID };
