import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateSemesterStatusID {
  async updateSemesterStatusID(userID, studentHasSpecializationID, semesterStatusID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update studentHasSpecialization set semesterStatusID = ?
    where userID = ? and studentHasSpecializationID = ?
    `, [semesterStatusID, userID, studentHasSpecializationID]);
    connection.release();
    return { result };
  }
}

export { UpdateSemesterStatusID };
