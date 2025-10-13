/* eslint-disable no-console */
import pool from '../../../dbConnection.js';

class GetRubricDataByCategory {
  async getRubricDataByCategory(rubricID, evaluatorCategoryID, studentHasSemesterID, evaluationID, evaluationTypeID) {
    const connection = await pool.getConnection();
    try {
      let query = `
      SELECT 
        r.rubricID, r.name AS rubricName, r.description AS rubricDescription, 
        rhs.sectionID, rhs.rubricHasSectionID, s.name AS sectionName, rhs.positionNumber AS sectionPosition, 
        rhq.questionID, rhq.rubricHasQuestionID, q.question AS question, rhq.positionNumber AS questionPosition, `;

      if (evaluationTypeID == 1) { // Anteproyecto
        query += `
        ea.evaluatorAnswerID AS answerID,
        ea.preprojectEvaluatorID AS evaluatorID,
        ea.answer AS answer,
        pe.evaluationStatusID,
        es.name,
        pe.comment
      FROM 
        rubric r
        JOIN rubricHasSection rhs ON r.rubricID = rhs.rubricID
        JOIN section s ON rhs.sectionID = s.sectionID
        JOIN rubricHasQuestion rhq ON rhs.rubricHasSectionID = rhq.rubricHasSectionID
        JOIN question q ON rhq.questionID = q.questionID
        LEFT JOIN evaluatorAnswer ea ON rhq.rubricHasQuestionID = ea.rubricHasQuestionID
        LEFT JOIN preprojectEvaluator pe ON ea.preprojectEvaluatorID = pe.preprojectEvaluatorID
        LEFT JOIN evaluationStatus es ON pe.evaluationStatusID = es.evaluationStatusID
        JOIN evaluation ev ON pe.evaluationID = ev.evaluationID
      WHERE 
        r.rubricID = ? AND pe.evaluatorCategoryID = ? AND ev.studentHasSemesterID = ? AND ev.evaluationID = ?`;
      } else if (evaluationTypeID == 2) { // Tesis
        query += `
        sa.stageAnswerID AS answerID,
        sa.thesisEvaluatorID AS evaluatorID,
        sa.answer AS answer,
        te.grade1,
        te.comment
      FROM 
        rubric r
        JOIN rubricHasSection rhs ON r.rubricID = rhs.rubricID
        JOIN section s ON rhs.sectionID = s.sectionID
        JOIN rubricHasQuestion rhq ON rhs.rubricHasSectionID = rhq.rubricHasSectionID
        JOIN question q ON rhq.questionID = q.questionID
        LEFT JOIN stageAnswer sa ON rhq.rubricHasQuestionID = sa.rubricHasQuestionID
        LEFT JOIN thesisEvaluator te ON sa.thesisEvaluatorID = te.thesisEvaluatorID
        JOIN evaluation ev ON te.evaluationID = ev.evaluationID
      WHERE 
        r.rubricID = ? AND te.evaluatorCategoryID = ? AND ev.studentHasSemesterID = ? AND ev.evaluationID = ?`;
      } else {
        throw new Error('Invalid evaluationTypeID');
      }
      const [result] = await connection.execute(query, [rubricID, evaluatorCategoryID, studentHasSemesterID, evaluationID]);
      return result;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    } finally {
      connection.release(); // Always release the connection when done
    }
  }
}

export { GetRubricDataByCategory };
