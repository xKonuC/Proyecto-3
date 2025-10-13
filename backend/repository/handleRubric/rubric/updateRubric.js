import pool from '../../../dbConnection.js';

class UpdateRubric {
  async updateRubric(rubricID, name, description, templateID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update rubric set name = ?, description = ?, templateID = ?
    where rubricID = ?;
    `, [name, description, templateID, rubricID]);
    connection.release();
    return { result };
  }
}

export { UpdateRubric };
