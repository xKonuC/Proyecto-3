import pool from '../../../dbConnection.js';

class DeleteRubricHasSection {
  async deleteRubricHasSection(rubricHasSectionIDs, rubricID) {
    const placeholders = rubricHasSectionIDs.map(() => '?').join(', ');
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    delete from rubricHasSection
    where rubricID = ? and rubricHasSectionID in (${placeholders});
    `, [rubricID, ...rubricHasSectionIDs]);
    connection.release();
    return { result };
  }
}

export { DeleteRubricHasSection };
