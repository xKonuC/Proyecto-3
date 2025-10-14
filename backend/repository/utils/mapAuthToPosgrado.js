import pool from '../../dbConnection.js';

class MapAuthToPosgrado {
  async mapAuthToPosgrado(authdbId) {
    const connection = await pool.getConnection();
    
    try {
      // Buscar el mapeo de ID
      const [mapping] = await connection.execute(`
        SELECT posgrado_userID FROM id_mapping WHERE authdb_id = ?
      `, [authdbId]);
      
      if (mapping.length === 0) {
        return null;
      }
      
      return mapping[0].posgrado_userID;
    } catch (error) {
      console.error('Error mapping auth ID to posgrado ID:', error);
      return null;
    } finally {
      connection.release();
    }
  }
}

export { MapAuthToPosgrado };
