import pool from '../../dbConnection.js';

class SearchAdministrative {
  async searchAdministrative(id) {
    const connection = await pool.getConnection();
    const [administrative] = await connection.execute(`
    SELECT * FROM administrative WHERE userID = ?
`, [id]);
    connection.release();
    return administrative;
  }
}

export { SearchAdministrative };
