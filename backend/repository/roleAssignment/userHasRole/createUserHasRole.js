import pool from '../../../dbConnection.js';

class CreateUserHasRole {
  async createUserHasRole(userID, roleID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('insert into userHasRole (userID, roleID) values (?,?);', [userID, roleID]);
    connection.release();
    return { result };
  }
}

export { CreateUserHasRole };
