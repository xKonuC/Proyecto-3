import posgradoPool from '../../../posgradoDbConnection.js';

class GetUserHasPermission {
  async getUserHasPermission(userID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    SELECT
      *
    FROM userHasPermission
    WHERE userID = ?
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { GetUserHasPermission };
