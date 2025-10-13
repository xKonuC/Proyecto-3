import pool from '../../../dbConnection.js';

class GetSemester {
  async getSemester(semesterID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    select * from semester where semesterID = ?;
    `, [semesterID]);
    connection.release();
    return result[0];
  }
}

export { GetSemester };
