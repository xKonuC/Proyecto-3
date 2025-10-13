import pool from '../../../dbConnection.js';

class CreateConsultancy {
  async createConsultancy(userID, title, contractingInstitution, grantYear, executionPeriod, objective, accessURL) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into consultancy (userID, title, contractingInstitution, grantYear, executionPeriod, objective, accessURL)
    values (?,?,?,?,?,?,?)
    `, [userID, title, contractingInstitution, grantYear, executionPeriod, objective, accessURL]);
    connection.release();
    return { result };
  }
}

export { CreateConsultancy };
