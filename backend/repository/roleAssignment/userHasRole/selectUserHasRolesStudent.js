import posgradoPool from '../../../posgradoDbConnection.js';

class SelectUserHasRolesStudent {
  async SelectUserHasRolesStudent() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`select * from userHasRole, user, role
      where userHasRole.userID = user.userID and
      userHasRole.roleID = role.roleID and
      role.roleID = 4    
    ;`);
    connection.release();
    return { result };
  }
}

export { SelectUserHasRolesStudent };
