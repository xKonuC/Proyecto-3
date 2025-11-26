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
      
      // Buscar si el usuario tiene roles administrativos (1=SuperAdmin, 2=Administrador, 3=Académico)
      const [adminRoles] = await connection.execute(`
        SELECT uhr.userID, uhr.roleID, r.name as roleName
        FROM userHasRole uhr
        JOIN role r ON uhr.roleID = r.roleID
        WHERE uhr.userID = ? AND uhr.roleID IN (1, 2, 3)
      `, [posgradoUserID]);
      
      return adminRoles;
    } finally {
      connection.release();
    }
  }
}

export { SearchAdministrative };
