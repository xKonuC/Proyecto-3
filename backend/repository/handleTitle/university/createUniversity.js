import pool from '../../../dbConnection.js';

class CreateUniversity {
  async createUniversity(name, city, country) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into university (name, city, country)
    values (?,?,?);
    `, [name, city, country]);
    connection.release();
    return { result };
  }
}

export { CreateUniversity };
