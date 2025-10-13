import pool from '../../../dbConnection.js';

class CreateRubricHasSection {
  async createRubricHasSection(rubricID, dataArray) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into rubricHasSection (sectionID, positionNumber, rubricID) values (?,?,?);
    `, [dataArray.sectionID, dataArray.positionNumber, rubricID]);
    connection.release();
    return result.insertId;
  }
}

export { CreateRubricHasSection };
