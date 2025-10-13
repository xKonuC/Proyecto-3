import pool from '../../../dbConnection.js';

class GetStudentHasSemester {
  async getStudentHasSemester(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      `
      SELECT shs.studentHasSemesterID, shs.specializationID, shs.userID, shs.evaluationTypeID, shs.evaluationStatusID,
      JSON_OBJECT('name', s2.name) AS specialization,
      JSON_OBJECT('name', es.name, 'description', es.description) AS evaluationStatus, 
      JSON_OBJECT('name', et.name) AS evaluationType,
      JSON_OBJECT('semesterID', se.semesterID, 'startDate', se.startDate, 'finishDate', se.finishDate, 'semesterNumber', se.semesterNumber, 'year', se.year) AS semester
      FROM studentHasSemester shs
      JOIN specialization s2 ON shs.specializationID = s2.specializationID
      LEFT JOIN evaluationStatus es ON shs.evaluationStatusID = es.evaluationStatusID 
      LEFT JOIN evaluationType et ON shs.evaluationTypeID = et.evaluationTypeID
      LEFT JOIN semester se ON shs.semesterID = se.semesterID
      WHERE shs.userID = ?;
    `,
      [userID],
    );
    connection.release();
    return { result };
  }
}

export { GetStudentHasSemester };
