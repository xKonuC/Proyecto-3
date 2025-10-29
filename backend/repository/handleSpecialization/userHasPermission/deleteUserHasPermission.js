import posgradoPool from '../../../posgradoDbConnection.js';

class DeleteUserHasPermission {
  async deleteUserHasPermission(userHasPermissionIDs) {
    const connection = await posgradoPool.getConnection();
    const placeholders = userHasPermissionIDs.map(() => '?').join(',');
    const [result] = await connection.execute(`
    DELETE FROM userHasPermission
    WHERE userHasPermissionID IN (${placeholders})
  `, userHasPermissionIDs);
    connection.release();
    return { result };
  }
}

export { DeleteUserHasPermission };
