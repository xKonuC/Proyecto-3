import posgradoPool from '../../../posgradoDbConnection.js';

class SelectUserHasRolesGraduate {
  async SelectUserHasRolesGraduate() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`select * from userHasRole, user, role
      where userHasRole.userID = user.userID and
      userHasRole.roleID = role.roleID and
      role.roleID = 5    
    ;`);
    connection.release();
    return { result };
  }
}

export { SelectUserHasRolesGraduate };
