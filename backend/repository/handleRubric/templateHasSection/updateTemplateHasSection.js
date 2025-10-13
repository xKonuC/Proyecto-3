import pool from '../../../dbConnection.js';

class UpdateTemplateHasSection {
  async updateTemplateHasSection(dataArray, templateID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update templateHasSection set
      sectionID = ?, positionNumber = ?
    where templateHasSectionID = ? and templateID = ?;
    `, [dataArray.sectionID, dataArray.positionNumber, dataArray.templateHasSectionID, templateID]);
    connection.release();
    return { result };
  }
}

export { UpdateTemplateHasSection };
