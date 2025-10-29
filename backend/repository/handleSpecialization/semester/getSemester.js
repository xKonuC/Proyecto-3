import posgradoPool from '../../../posgradoDbConnection.js';

class GetSemester {
  async getSemester(semesterID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from semester where semesterID = ?;
    `, [semesterID]);
    connection.release();
    return result[0];
  }
}

export { GetSemester };
