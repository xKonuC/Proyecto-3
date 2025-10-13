import pool from '../../../dbConnection.js';

class UpdateUniversity {
  async updateUniversity(universityID, name, city, country) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update university set
      name = ?,
      city = ?,
      country = ?
    where universityID = ?
    `, [name, city, country, universityID]);
    connection.release();
    return { result };
  }
}

export { UpdateUniversity };
