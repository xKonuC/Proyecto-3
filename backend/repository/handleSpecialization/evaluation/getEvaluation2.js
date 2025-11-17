import posgradoPool from '../../../posgradoDbConnection.js';

class GetEvaluation {
  async getEvaluation(studentHasSemesterID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from  evaluation 
    where studentHasSemesterID = ?
    `, [studentHasSemesterID]);
    connection.release();
    return { result };
  }
}

export { GetEvaluation };
