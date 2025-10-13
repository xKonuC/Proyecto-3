import pool from '../../../dbConnection.js';

class CreateRubricHasQuestion {
  async createRubricHasQuestion(dataArray) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into rubricHasQuestion (questionID, rubricHasSectionID, positionNumber) 
    values (?,?,?);
    `, [dataArray.questionID, dataArray.rubricHasSectionID, dataArray.positionNumber]);
    connection.release();
    return result.insertId;
  }
}

export { CreateRubricHasQuestion };
