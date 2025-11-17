import posgradoPool from '../../../posgradoDbConnection.js';

class SelectUserByUserID {
  async selectUserByUserID(userID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    SELECT * FROM userHasRoles WHERE userID = ?
`, [userID]);
    connection.release();
    return result[0];
  }
}

export { SelectUserByUserID };
