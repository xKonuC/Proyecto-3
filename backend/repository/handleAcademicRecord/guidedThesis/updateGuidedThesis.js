import pool from '../../../dbConnection.js';

class UpdateGuidedThesis {
  async updateGuidedThesis(guidedThesisID, userID, author, type, role, year, title, program, institution, sameProgram, accessURL) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update guidedThesis set author = ?, type = ?, role = ?, year = ?, title = ?, program = ?, institution = ?, sameProgram = ?, accessURL = ?
    where guidedThesisID = ? and userID = ?;
    `, [author, type, role, year, title, program, institution, sameProgram, accessURL, guidedThesisID, userID]);
    connection.release();
    return { result };
  }
}

export { UpdateGuidedThesis };
