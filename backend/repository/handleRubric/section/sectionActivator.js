import pool from '../../../dbConnection.js';

class SectionActivator {
  async sectionActivator(sectionIDs, isActive) {
    const connection = await pool.getConnection();
    const placeholders = sectionIDs.map(() => '?').join(',');
    const [result] = await connection.execute(`
      UPDATE section 
      SET isActive = ?
      WHERE sectionID IN (${placeholders});
    `, [isActive, ...sectionIDs]);
    connection.release();
    return { result };
  }
}

export { SectionActivator };
