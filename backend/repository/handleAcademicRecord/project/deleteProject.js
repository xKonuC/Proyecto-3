import posgradoPool from '../../../posgradoDbConnection.js';

class DeleteProject {
  async deleteProject(projectIDs, userID) {
    const placeholders = projectIDs.map(() => '?').join(', ');

    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    delete from project where userID = ? and projectID in (${placeholders})
    `, [userID, ...projectIDs]);
    connection.release();
    return { result };
  }
}

export { DeleteProject };
