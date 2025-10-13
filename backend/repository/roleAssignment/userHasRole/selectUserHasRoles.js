import pool from '../../../dbConnection.js';

class SelectUserHasRoles {
  async selectUserHasRoles() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('select * from userHasRoles;');
    connection.release();
    return { result };
  }
}

export { SelectUserHasRoles };
