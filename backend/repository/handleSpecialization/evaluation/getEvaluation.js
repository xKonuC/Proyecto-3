import pool from '../../../dbConnection.js';

class GetEvaluation {
  async getEvaluation(studentHasSemesterID, typeEvaluationID) {
    const connection = await pool.getConnection();
    let query = `
    SELECT 
      ev.evaluationID,
      ev.studentHasSemesterID,
      ev.evaluationStatusID,
      ev.projectURL,
      ev.formatID,
      ev.creationDate,
      ev.updateDate,
      ev.lateMinutes,
      ev.rubricID,
      ev.thesisGradesID,
      JSON_OBJECT(
        'evaluationStatusID', est.evaluationStatusID,
        'name', est.name,
        'description', est.description
      ) AS evaluationStatus,
      JSON_OBJECT(
        'specializationID', sp.specializationID,
        'name', sp.name
      ) AS specialization`;

    if (typeEvaluationID == 2) {
      query += `,
          JSON_OBJECT(
            'thesisGradesID', ev.thesisGradesID,
            'finalGrade', ROUND(tg.finalGrade, 1),
            'grade1', ROUND(tg.grade1, 1),
            'grade2', ROUND(tg.grade2, 1),
            'grade3', ROUND(tg.grade3, 1)
          ) AS thesis_grades`;
    }

    query += `
    FROM 
      evaluation ev
    INNER JOIN 
      studentHasSemester shs ON ev.studentHasSemesterID = shs.studentHasSemesterID
    LEFT JOIN 
      evaluationStatus est ON ev.evaluationStatusID = est.evaluationStatusID
    LEFT JOIN 
      specialization sp ON shs.specializationID = sp.specializationID`;

    if (typeEvaluationID == 2) {
      query += `
      LEFT JOIN 
        thesisGrades tg ON ev.thesisGradesID = tg.thesisGradesID`;
    }

    query += `
    WHERE ev.studentHasSemesterID = ?
    GROUP BY ev.evaluationID;`;

    const [result] = await connection.execute(query, [studentHasSemesterID]);
    connection.release();
    return { result };
  }
}

export { GetEvaluation };
