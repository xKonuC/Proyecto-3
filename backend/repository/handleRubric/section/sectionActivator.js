import posgradoPool from '../../../posgradoDbConnection.js';

class SectionActivator {
  async sectionActivator(sectionIDs, isActive) {
    const connection = await posgradoPool.getConnection();
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
