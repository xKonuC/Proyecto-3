import pool from '../../../dbConnection.js';

class UpdateRubricHasSection {
  async updateRubricHasSection(dataArray, rubricID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update rubricHasSection set
      sectionID = ?, positionNumber = ?
    where rubricHasSectionID = ? and rubricID = ?;
    `, [dataArray.sectionID, dataArray.positionNumber, dataArray.rubricHasSectionID, rubricID]);
    connection.release();
    return { result };
  }
}

export { UpdateRubricHasSection };
