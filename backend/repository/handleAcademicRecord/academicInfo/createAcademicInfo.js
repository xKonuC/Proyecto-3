import posgradoPool from '../../../posgradoDbConnection.js';

class CreateAcademicInfo {
  async createAcademicInfo(userID, bondType, investigationLines, bestDegreeID, workedHours, hierarchy) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    insert into academicInfo (userID, bondType, investigationLines, bestDegreeID, workedHours, hierarchy)
    values (?,?,?,?,?,?)
    `, [userID, bondType, investigationLines, bestDegreeID, workedHours, hierarchy]);
    connection.release();
    return { result };
  }
}

export { CreateAcademicInfo };
