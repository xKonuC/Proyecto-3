import posgradoPool from '../../../posgradoDbConnection.js';

class GetThesisRegistration {
  async getThesisRegistration(studentID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from thesisRegistration where studentID = ?;
    `, [studentID]);
    connection.release();
    return result[0];
  }
}

export { GetThesisRegistration };
