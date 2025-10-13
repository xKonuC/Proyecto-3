import pool from '../../../dbConnection.js';

class UpdateTemplate {
  async updateTemplate(templateID, name, description) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update template set name = ?, description = ?
    where templateID = ?;
    `, [name, description, templateID]);
    connection.release();
    return { result };
  }
}

export { UpdateTemplate };
