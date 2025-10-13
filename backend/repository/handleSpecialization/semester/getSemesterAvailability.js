import pool from '../../../dbConnection.js';
import getTimestamp from '../../../utils/getTimestamp.js';

// Se puede usar NOW() pero dependerá de la configuración de la base de datos
class GetSemesterAvailability {
  async getSemesterAvailability() {
    const now = getTimestamp(); // Obtener la fecha y hora actual desde tu función getTimestamp()
    const connection = await pool.getConnection();
    const [result] = await connection.query(`
      SELECT *
      FROM semester
      WHERE startDate <= ?   -- Fecha de inicio anterior o igual a la fecha actual
      ORDER BY startDate DESC  -- Ordena por fecha de inicio descendente
      LIMIT 2;  -- Limita a 1 resultado para obtener el semestre más reciente
      `, [now]);
    connection.release();
    return { result };
  }
}

export { GetSemesterAvailability };
