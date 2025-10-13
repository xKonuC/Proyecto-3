import pool from '../../../dbConnection.js';

class DeleteUniversity {
  async deleteUniversity(universityIDs) {
    const placeholders = universityIDs.map(() => '?').join(', ');
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    delete from university
    where universityID in (${placeholders})
    `, universityIDs);
    connection.release();
    return { result };
  }
}

export { DeleteUniversity };
