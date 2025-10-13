import pool from '../../../dbConnection.js';

class UpdateConsultancy {
  async updateConsultancy(consultancyID, userID, title, contractingInstitution, grantYear, executionPeriod, objective, accessURL) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update consultancy set
    title = ?, contractingInstitution = ?, grantYear = ?, executionPeriod = ?, objective = ?, accessURL = ?
    where consultancyID = ? and userID = ?;
    `, [title, contractingInstitution, grantYear, executionPeriod, objective, accessURL, consultancyID, userID]);
    connection.release();
    return { result };
  }
}

export { UpdateConsultancy };
