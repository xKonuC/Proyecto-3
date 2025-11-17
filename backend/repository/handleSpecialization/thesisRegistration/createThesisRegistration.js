import posgradoPool from '../../../posgradoDbConnection.js';

class CreateThesisRegistration {
  async createThesisRegistration(studentID, directorID, codirectorID, title) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    insert into thesisRegistration (studentID, directorID, codirectorID, title)
    values (?,?,?,?)
    `, [studentID, directorID, codirectorID, title]);
    connection.release();
    return { result };
  }
}

export { CreateThesisRegistration };
