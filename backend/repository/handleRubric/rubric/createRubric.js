import pool from '../../../dbConnection.js';

class CreateRubric {
  async createRubric(name, description, templateID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    INSERT INTO rubric (name, description, templateID)
    VALUES (?, ?, ?);
    `, [name, description, templateID]);
    connection.release();
    return result.insertId;
  }
}

export { CreateRubric };
