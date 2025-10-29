import posgradoPool from '../../../posgradoDbConnection.js';

class SelectUserHasRolesAdministrative {
  async selectUserHasRolesAdministrative() {
    const connection = await posgradoPool.getConnection();
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
