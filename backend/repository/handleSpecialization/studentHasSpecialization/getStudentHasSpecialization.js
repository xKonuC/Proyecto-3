/* eslint-disable max-len */
import pool from '../../../dbConnection.js';

class GetStudentHasSpecialization {
  async getStudentHasSpecialization(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      `
    SELECT shs.studentHasSpecializationID, shs.specializationID, shs.userID, shs.semesterStatusID, 
    JSON_OBJECT('name', s1.name, 'description', s1.description) AS semesterStatus, 
    JSON_OBJECT('name', s2.name) AS specialization, 
    JSON_OBJECT( 'semesterID', se1.semesterID, 'startDate', se1.startDate, 'finishDate', se1.finishDate, 'semesterNumber', se1.semesterNumber, 'year', se1.year ) AS entrySemester, 
    JSON_OBJECT( 'semesterID', se2.semesterID, 'startDate', se2.startDate, 'finishDate', se2.finishDate, 'semesterNumber', se2.semesterNumber, 'year', se2.year ) AS completionSemester 
    FROM studentHasSpecialization shs JOIN semesterStatus s1 ON shs.semesterStatusID = s1.semesterStatusID JOIN specialization s2 ON shs.specializationID = s2.specializationID LEFT JOIN semester se1 ON shs.entrySemesterID = se1.semesterID LEFT JOIN semester se2 ON shs.completionSemesterID = se2.semesterID where userID = ?`,
      [userID],
    );
    connection.release();
    return { result };
  }
}

export { GetStudentHasSpecialization };
