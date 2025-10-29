import posgradoPool from '../../../posgradoDbConnection.js';

class CreateGuidedThesis {
  async createGuidedThesis(userID, author, type, role, year, title, program, institution, sameProgram, accessURL) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    insert into guidedThesis (userID, author, type, role, year, title, program, institution, sameProgram, accessURL)
    values (?,?,?,?,?,?,?,?,?,?)
    `, [userID, author, type, role, year, title, program, institution, sameProgram, accessURL]);
    connection.release();
    return { result };
  }
}

export { CreateGuidedThesis };
