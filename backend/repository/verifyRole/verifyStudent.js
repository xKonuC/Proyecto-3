import posgradoPool from '../../posgradoDbConnection.js';

class VerifyStudent {
  async verifyStudent(userID) {
    const connection = await posgradoPool.getConnection();
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
