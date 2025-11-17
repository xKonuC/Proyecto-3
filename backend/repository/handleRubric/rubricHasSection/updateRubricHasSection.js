import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateRubricHasSection {
  async updateRubricHasSection(dataArray, rubricID) {
    const connection = await posgradoPool.getConnection();
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
