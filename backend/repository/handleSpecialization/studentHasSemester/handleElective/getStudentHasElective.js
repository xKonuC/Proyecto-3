import pool from '../../../../dbConnection.js';

class GetStudentHasElective {
  async getStudentHasElective(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      `
      SELECT 
        she.studentHasElectiveID, 
        she.userID,
        she.electiveID,
        JSON_OBJECT('semesterID', se.semesterID, 'startDate', se.startDate, 'finishDate', se.finishDate, 'semesterNumber', se.semesterNumber, 'year', se.year) AS semester,
        JSON_OBJECT(
          'number', e.number, 
          'name', e.name,
          'specialization', JSON_OBJECT(
            'specializationID', s.specializationID,
            'name', s.name
          )
        ) AS elective
      FROM studentHasElective she
      JOIN elective e ON she.electiveID = e.electiveID
      JOIN specialization s ON e.specializationID = s.specializationID
      JOIN semester se ON she.semesterID = se.semesterID 
      WHERE she.userID = ?;
      `,
      [userID],
    );
    connection.release();
    return { result };
  }
}

export { GetStudentHasElective };
