import pool from '../../../dbConnection.js';

class SelectRolesHasUserAcademic {
  async SelectRolesHasUserAcademic() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`select * from userHasRole, user, role
      where userHasRole.userID = user.userID and
      userHasRole.roleID = role.roleID and
      role.roleID = 3    
    ;`);
    connection.release();
    return { result };
  }
}

export { SelectRolesHasUserAcademic };
