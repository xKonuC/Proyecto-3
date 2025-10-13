import pool from '../../../dbConnection.js';

class GetTemplateOverview {
  async getTemplateOverview(templateID, questionIsActive, templateIsActive, sectionIsActive) {
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(`
        SELECT 
          t.templateID,
          t.name,
          t.description,
          JSON_ARRAYAGG(
              JSON_OBJECT(
                  'sectionID', s.sectionID,
                  'name', s.name,
                  'templateHasSectionID', ts.templateHasSectionID,
                  'positionNumber', ts.positionNumber,
                  'questions', (
                      SELECT JSON_ARRAYAGG(
                          JSON_OBJECT(
                              'questionID', q.questionID,
                              'userID', q.userID,
                              'question', q.question,
                              'templateHasQuestionID', tq.templateHasQuestionID,
                              'positionNumber', tq.positionNumber
                          )
                      )
                      FROM templateHasQuestion tq
                      JOIN question q ON tq.questionID = q.questionID
                      WHERE tq.templateHasSectionID = ts.templateHasSectionID AND q.isActive = ?
                  )
              )
          ) AS sections
        FROM 
          template t
        LEFT JOIN 
          templateHasSection ts ON t.templateID = ts.templateID
        LEFT JOIN 
          section s ON ts.sectionID = s.sectionID AND s.isActive = ?
        WHERE 
          t.templateID = ? AND t.isActive = ?
        GROUP BY 
          t.templateID
      `, [questionIsActive, sectionIsActive, templateID, templateIsActive]);
      connection.release();

      return result.length > 0 ? { result } : null;
    } catch (error) {
      console.error('Error al obtener la visión general de la plantilla:', error);
      throw error;
    }
  }
}

export { GetTemplateOverview };
