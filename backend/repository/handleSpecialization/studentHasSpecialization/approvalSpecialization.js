import posgradoPool from '../../../posgradoDbConnection.js';

class ApprovalSpecialization {
  async approvalSpecialization(userID, specializationID, semesterStatusID, completionSemesterID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update studentHasSpecialization set semesterStatusID = ?, completionSemesterID = ?
    where userID = ? and specializationID = ? 
    `, [semesterStatusID, completionSemesterID, userID, specializationID]);
    connection.release();
    return { result };
  }
}

export { ApprovalSpecialization };
