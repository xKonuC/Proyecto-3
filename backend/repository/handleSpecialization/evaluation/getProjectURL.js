import posgradoPool from '../../../posgradoDbConnection.js';

class GetProjectURL {
  async getProjectURL(evaluationID, studentHasSemesterID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
      select * from evaluation where evaluationID = ? and studentHasSemesterID = ?;
    `, [evaluationID, studentHasSemesterID]);
    connection.release();
    return result[0].projectURL;
  }
}

export { GetProjectURL };
