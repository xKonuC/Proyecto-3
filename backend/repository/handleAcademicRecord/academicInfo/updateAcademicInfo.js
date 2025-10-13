import pool from '../../../dbConnection.js';

class UpdateAcademicInfo {
  async updateAcademicInfo(userID, bondType, investigationLines, bestDegreeID, workedHours, hierarchy) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update academicInfo set
    bondType = ?, investigationLines = ?, bestDegreeID = ?, workedHours = ?, hierarchy = ?
    where userID = ?;
    `, [bondType, investigationLines, bestDegreeID, workedHours, hierarchy, userID]);
    connection.release();
    return { result };
  }
}

export { UpdateAcademicInfo };
