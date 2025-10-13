import pool from '../../../dbConnection.js';

class VerifyElective {
  async verifyElective(specializationID, electiveID, number) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    SELECT * FROM elective WHERE
    specializationID = ? AND electiveID = ? AND number = ?
  `, [specializationID, electiveID, number]);
    connection.release();
    return result[0];
  }
}

export { VerifyElective };
