import pool from '../../../dbConnection.js';

class GetStudentHasSpecialization {
  async getStudentHasSpecialization() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      `
      SELECT shs.studentHasSemesterID, shs.specializationID, shs.userID, shs.semesterStatusID, shs.evaluationTypeID,
      JSON_OBJECT('name', s1.name, 'description', s1.description) AS semesterStatus, 
      JSON_OBJECT('name', s2.name) AS specialization,
      JSON_OBJECT('name', es.name, 'description', es.description) AS evaluationStatus, 
      JSON_OBJECT('name', et.name) AS evaluationType,
      JSON_OBJECT('semesterID', se.semesterID, 'startDate', se.startDate, 'finishDate', se.finishDate, 'semesterNumber', se.semesterNumber, 'year', se.year) AS semester
      FROM studentHasSemester shs
      JOIN semesterStatus s1 ON shs.semesterStatusID = s1.semesterStatusID 
      JOIN specialization s2 ON shs.specializationID = s2.specializationID
      LEFT JOIN evaluationStatus es ON shs.evaluationStatusID = es.evaluationStatusID 
      LEFT JOIN evaluationType et ON shs.evaluationTypeID = et.evaluationTypeID
      LEFT JOIN semester se ON shs.semesterID = se.semesterID
    `,
    );
    connection.release();
    return { result };
  }
}

export { GetStudentHasSpecialization };
