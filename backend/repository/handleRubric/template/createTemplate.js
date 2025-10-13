import pool from '../../../dbConnection.js';

class CreateTemplate {
  async createTemplate(name, description) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into template (name, description) values
    (?,?)
    `, [name, description]);
    connection.release();
    return { result };
  }
}

export { CreateTemplate };
