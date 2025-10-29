import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateTitle {
  async updateTitle(titleID, name, degreeID, universityID, areaID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update title set
      name = ?,
      degreeID = ?,
      universityID = ?,
      areaID = ?
    where titleID = ?
    `, [name, degreeID, universityID, areaID, titleID]);
    connection.release();
    return { result };
  }
}

export { UpdateTitle };
