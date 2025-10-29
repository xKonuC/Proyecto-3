import posgradoPool from '../../../posgradoDbConnection.js';

class SelectUserHasRolesAcademic {
  async SelectUserHasRolesAcademic() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`select * from userHasRole, user, role
      where userHasRole.userID = user.userID and
      userHasRole.roleID = role.roleID and
      role.roleID = 3    
    ;`);
    connection.release();
    return { result };
  }
}

export { SelectUserHasRolesAcademic };
