import posgradoPool from '../../../posgradoDbConnection.js';

class DeleteTemplateHasSection {
  async deleteTemplateHasSection(templateHasSectionIDs, templateID) {
    const placeholders = templateHasSectionIDs.map(() => '?').join(', ');
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    delete from templateHasSection
    where templateID = ? and templateHasSectionID in (${placeholders});
    `, [templateID, ...templateHasSectionIDs]);
    connection.release();
    return { result };
  }
}

export { DeleteTemplateHasSection };
