import posgradoPool from '../../posgradoDbConnection.js';

class CreateStudents {
  async createStudents(excelData) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    insert into userHasRole (userID, roleID) values (?,?)
    `, [excelData.userID, excelData.roleID]);
    connection.release();
    return { result };
  }
}

export { CreateStudents };
