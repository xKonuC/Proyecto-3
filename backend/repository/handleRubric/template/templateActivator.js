import posgradoPool from '../../../posgradoDbConnection.js';

class TemplateActivator {
  async templateActivator(templateIDs, isActive) {
    const connection = await posgradoPool.getConnection();
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
