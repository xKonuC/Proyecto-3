import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateUniversity {
  async updateUniversity(universityID, name, city, country) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update university set
      name = ?,
      city = ?,
      country = ?
    where universityID = ?
    `, [name, city, country, universityID]);
    connection.release();
    return { result };
  }
}

export { UpdateUniversity };
