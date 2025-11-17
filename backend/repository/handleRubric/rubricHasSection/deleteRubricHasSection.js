import posgradoPool from '../../../posgradoDbConnection.js';

class DeleteRubricHasSection {
  async deleteRubricHasSection(rubricHasSectionIDs, rubricID) {
    const placeholders = rubricHasSectionIDs.map(() => '?').join(', ');
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    delete from rubricHasSection
    where rubricID = ? and rubricHasSectionID in (${placeholders});
    `, [rubricID, ...rubricHasSectionIDs]);
    connection.release();
    return { result };
  }
}

export { DeleteRubricHasSection };
