import pool from '../../dbConnection.js';

class VerifyRole {
  async verifyRole(roleID, userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      SELECT user.*, role.*
      FROM userHasRole
      JOIN user ON userHasRole.userID = user.userID
      JOIN role ON userHasRole.roleID = role.roleID
      WHERE userHasRole.userID = ? AND userHasRole.roleID = ?
    `, [userID, roleID]);
    connection.release();
    if (result.length > 0) {
      return result[0];
    }
    return null;
  }
}

export { VerifyRole };
