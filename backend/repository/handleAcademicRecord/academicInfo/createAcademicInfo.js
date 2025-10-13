import pool from '../../../dbConnection.js';

class CreateAcademicInfo {
  async createAcademicInfo(userID, bondType, investigationLines, bestDegreeID, workedHours, hierarchy) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into academicInfo (userID, bondType, investigationLines, bestDegreeID, workedHours, hierarchy)
    values (?,?,?,?,?,?)
    `, [userID, bondType, investigationLines, bestDegreeID, workedHours, hierarchy]);
    connection.release();
    return { result };
  }
}

export { CreateAcademicInfo };
