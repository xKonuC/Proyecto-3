import pool from '../../../dbConnection.js';

class CreateProject {
  async createProject(userID, title, type, fundingSource, grantYear, executionPeriod, role, accessURL) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into project (userID, title, type, fundingSource, grantYear, executionPeriod, role, accessURL)
    values (?,?,?,?,?,?,?,?)
    `, [userID, title, type, fundingSource, grantYear, executionPeriod, role, accessURL]);
    connection.release();
    return { result };
  }
}

export { CreateProject };
