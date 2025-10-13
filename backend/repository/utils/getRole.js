import pool from '../../dbConnection.js';

class GetRole {
  async getRole() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute('SELECT * FROM role;');
    connection.release();
    const profiles = {};
    result.forEach((profile) => {
      profiles[profile.name] = profile.roleID;
    });
    return profiles;
  }
}

export { GetRole };