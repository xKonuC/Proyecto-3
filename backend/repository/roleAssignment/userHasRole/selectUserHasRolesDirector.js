import pool from '../../../dbConnection.js';

class SelectUserHasRolesDirector {
  async selectUserHasRolesDirector() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`select * from userHasRole, role, user
    where userHasRole.userID = user.userID and
    userHasRole.roleID = role.roleID and
    role.roleID = 1
    ;`);
    connection.release();
    return { result };
  }
}

export { SelectUserHasRolesDirector };
