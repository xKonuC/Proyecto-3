import posgradoPool from '../../../posgradoDbConnection.js';

class DeleteAcademicInfo {
  async deleteAcademicInfo(userID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    delete from academicInfo where userID = ?
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { DeleteAcademicInfo };
