import posgradoPool from '../../../posgradoDbConnection.js';

class SelectUserHasRoles {
  async selectUserHasRoles() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute('select * from userHasRoles;');
    connection.release();
    return { result };
  }
}

export { SelectUserHasRoles };
