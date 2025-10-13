import pool from '../../../dbConnection.js';

class CreateRoleHasNewUser {
  async createRoleHasNewUser(userID, roleID) {
    const connection = await pool.getConnection();
    const [response] = await connection.execute('INSERT INTO userHasRole (userID, roleID) values (?,?)', [userID, roleID]);
    connection.release();
    return { id: response.insertId };
  }
}

export { CreateRoleHasNewUser };
