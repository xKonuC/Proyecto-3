import pool from '../../../dbConnection.js';

class SelectUserHasRolesAdministrative {
  async selectUserHasRolesAdministrative() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      SELECT DISTINCT user.* 
      FROM userHasRole 
      JOIN user ON userHasRole.userID = user.userID 
      JOIN role ON userHasRole.roleID = role.roleID 
      WHERE role.roleID IN (1, 2, 3);
    `);
    connection.release();
    return { result };
  }
}

export { SelectUserHasRolesAdministrative };
