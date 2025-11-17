import posgradoPool from '../../../posgradoDbConnection.js';

class DeleteUserHasRole {
  async deleteUserHasRole(userID, roleID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`delete from userHasRole where 
    userID = ? and roleID = ?
    `, [userID, roleID]);
    connection.release();
    return { result };
  }
}

export { DeleteUserHasRole };
