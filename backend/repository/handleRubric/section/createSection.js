import posgradoPool from '../../../posgradoDbConnection.js';

class CreateSection {
  async createSection(name) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    insert into section (name) values (?);
    `, [name]);
    connection.release();
    return { result };
  }
}

export { CreateSection };
