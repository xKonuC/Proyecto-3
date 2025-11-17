import posgradoPool from '../../../posgradoDbConnection.js';

class CreateRubricHasSection {
  async createRubricHasSection(rubricID, dataArray) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    insert into rubricHasSection (sectionID, positionNumber, rubricID) values (?,?,?);
    `, [dataArray.sectionID, dataArray.positionNumber, rubricID]);
    connection.release();
    return result.insertId;
  }
}

export { CreateRubricHasSection };
