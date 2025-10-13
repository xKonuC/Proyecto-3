import pool from '../../../dbConnection.js';

class UpdateTemplateID {
  async updateTemplateID(rubricID, templateID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update rubric set templateID = ?
    where rubricID = ?;
    `, [templateID, rubricID]);
    connection.release();
    return { result };
  }
}

export { UpdateTemplateID };
