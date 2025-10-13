import pool from '../../../dbConnection.js';

class SelectUserHasRole {
  async selectUserHasRole(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`select * from user, userHasRole, role where
    user.userID = ? and user.userID = userHasRole.userID and userHasRole.roleID=role.roleID
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { SelectUserHasRole };
