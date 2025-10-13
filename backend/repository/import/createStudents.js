import pool from '../../dbConnection.js';

class CreateStudents {
  async createStudents(excelData) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into userHasRole (userID, roleID) values (?,?)
    `, [excelData.userID, excelData.roleID]);
    connection.release();
    return { result };
  }
}

export { CreateStudents };
