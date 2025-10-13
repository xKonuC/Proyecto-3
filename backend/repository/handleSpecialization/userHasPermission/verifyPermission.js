import pool from '../../../dbConnection.js';

class VerifyPermission {
  async verifyPermission(userID, permissionID) {
    const connection = await pool.getConnection();
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
