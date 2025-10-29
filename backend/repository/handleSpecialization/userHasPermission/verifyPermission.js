import posgradoPool from '../../../posgradoDbConnection.js';

class VerifyPermission {
  async verifyPermission(userID, permissionID) {
    const connection = await posgradoPool.getConnection();
    try {
      const [result] = await connection.execute(
        `
        SELECT uhp.* FROM permission p
        JOIN userHasPermission uhp ON p.permissionID = uhp.permissionID
        WHERE uhp.userID = ? AND p.permissionID = ?;
        `,
        [userID, permissionID],
      );
      return { result };
    } finally {
      connection.release();
    }
  }
}

export { VerifyPermission };
