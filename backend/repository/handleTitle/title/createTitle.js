import posgradoPool from '../../../posgradoDbConnection.js';

class CreateTitle {
  async createTitle(name, degreeID, universityID, areaID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    insert into title (name, degreeID, universityID, areaID)
    values (?,?,?,?);
    `, [name, degreeID, universityID, areaID]);
    connection.release();
    return { result };
  }
}

export { CreateTitle };
