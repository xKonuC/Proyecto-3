import posgradoPool from '../../../posgradoDbConnection.js';

class CreateEvaluation {
  async createEvaluation(projectURL, formatID, studentHasSemesterID, lateMinutes, thesisGradesID, creationDate, rubricID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    insert into evaluation (projectURL, formatID, studentHasSemesterID, lateMinutes, thesisGradesID, creationDate, rubricID)
    values (?,?,?,?,?,?,?)
    `, [projectURL, formatID, studentHasSemesterID, lateMinutes, thesisGradesID, creationDate, rubricID]);
    connection.release();
    return result.insertId;
  }
}

export { CreateEvaluation };
