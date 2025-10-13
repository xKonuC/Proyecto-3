import pool from '../../../dbConnection.js';

class TemplateActivator {
  async templateActivator(templateIDs, isActive) {
    const connection = await pool.getConnection();
    const placeholders = templateIDs.map(() => '?').join(',');
    const [result] = await connection.execute(`
      UPDATE template 
      SET isActive = ?
      WHERE templateID IN (${placeholders});
    `, [isActive, ...templateIDs]);
    connection.release();
    return { result };
  }
}

export { TemplateActivator };
