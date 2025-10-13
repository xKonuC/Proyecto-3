import pool from '../../../dbConnection.js';

class DeleteProject {
  async deleteProject(projectIDs, userID) {
    const placeholders = projectIDs.map(() => '?').join(', ');

    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    delete from project where userID = ? and projectID in (${placeholders})
    `, [userID, ...projectIDs]);
    connection.release();
    return { result };
  }
}

export { DeleteProject };
