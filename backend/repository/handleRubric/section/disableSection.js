import posgradoPool from '../../../posgradoDbConnection.js';

class DisableSection {
  async disableSection(sectionIDs) {
    const connection = await posgradoPool.getConnection();
    const placeholders = sectionIDs.map(() => '?').join(',');
    const [result] = await connection.execute(`
    update section set isActive = 0
    where sectionID IN (${placeholders});
    `, [sectionIDs]);
    connection.release();
    return { result };
  }
}

export { DisableSection };
