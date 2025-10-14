import pool from '../../dbConnection.js';

class SearchAdministrative {
  async searchAdministrative(authdbId) {
    const connection = await pool.getConnection();
    
    // Primero buscar el mapeo de ID
    const [mapping] = await connection.execute(`
      SELECT posgrado_userID FROM id_mapping WHERE authdb_id = ?
    `, [authdbId]);
    
    if (mapping.length === 0) {
      connection.release();
      return [];
    }
    
    const posgradoUserID = mapping[0].posgrado_userID;
    
    // Buscar en la vista administrative usando el userID de posgrado_db
    const [administrative] = await connection.execute(`
      SELECT * FROM administrative WHERE userID = ?
    `, [posgradoUserID]);
    
    connection.release();
    return administrative;
  }
}

export { SearchAdministrative };
