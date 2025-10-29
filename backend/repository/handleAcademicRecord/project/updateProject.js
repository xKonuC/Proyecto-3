import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateProject {
  async updateProject(projectID, userID, title, type, fundingSource, grantYear, executionPeriod, role, accessURL) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update project set
    title = ?, type = ?, fundingSource = ?, grantYear = ?, executionPeriod = ?, role = ?, accessURL = ?
    where projectID = ? and userID = ?;
    `, [title, type, fundingSource, grantYear, executionPeriod, role, accessURL, projectID, userID]);
    connection.release();
    return { result };
  }
}

export { UpdateProject };
