import posgradoPool from '../../posgradoDbConnection.js';

class GetRole {
  async getRole() {
    const connection = await posgradoPool.getConnection();
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