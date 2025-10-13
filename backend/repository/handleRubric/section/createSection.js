import pool from '../../../dbConnection.js';

class CreateSection {
  async createSection(name) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into section (name) values (?);
    `, [name]);
    connection.release();
    return { result };
  }
}

export { CreateSection };
