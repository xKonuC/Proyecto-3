import pool from '../../../dbConnection.js';

class SelectRolesHasUserAdministrator {
  async selectRolesHasUserAdministrator() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`select * from userHasRole, role, user
    where userHasRole.userID = user.userID and
    userHasRole.roleID = role.roleID and
    role.roleID = 2
    ;`);
    connection.release();
    return { result };
  }
}

export { SelectRolesHasUserAdministrator };
