import pool from '../../../dbConnection.js';

class SelectUserHasRoles2 {
  async selectUserHasRoles2(tableName) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`select * from ${tableName}`);
    connection.release();
    return { result };
  }
}

export { SelectUserHasRoles2 };
