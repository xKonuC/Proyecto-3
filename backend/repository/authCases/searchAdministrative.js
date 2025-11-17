import posgradoPool from '../../posgradoDbConnection.js';

class SearchAdministrative {
  async searchAdministrative(authdbId) {
    const connection = await posgradoPool.getConnection();
    
    try {
      // Buscar el mapeo de ID en posgrado_db
      const [mapping] = await connection.execute(`
        SELECT posgrado_userID FROM id_mapping WHERE authdb_id = ?
      `, [authdbId]);
      
      // Si no hay mapeo, usar el mismo ID (usuarios con mismo ID en ambas DBs)
      const posgradoUserID = mapping.length > 0 ? mapping[0].posgrado_userID : authdbId;
      
      // Buscar en la tabla administrative de posgrado_db
      const [administrative] = await connection.execute(`
        SELECT * FROM administrative WHERE userID = ?
      `, [posgradoUserID]);
      
      return administrative;
    } finally {
      connection.release();
    }
  }
}

export { SearchAdministrative };
