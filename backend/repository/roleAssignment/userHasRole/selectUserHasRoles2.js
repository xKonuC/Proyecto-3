import posgradoPool from '../../../posgradoDbConnection.js';

class SelectUserHasRoles2 {
  async selectUserHasRoles2(tableName) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`select * from ${tableName}`);
    connection.release();
    return { result };
  }
}

export { SelectUserHasRoles2 };
