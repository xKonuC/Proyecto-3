import pool from '../../dbConnection.js';

class VerifyStudent {
  async verifyStudent(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from userHasRole, user, role
    where userHasRole.userID = user.userID and
    userHasRole.roleID = role.roleID and
    role.roleID = 4 and user.userID = ?;    
  `, [userID]);
    connection.release();
    if (result[0]) {
      return result[0];
    }
    return null;
  }
}

export { VerifyStudent };
