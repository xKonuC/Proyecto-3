import pool from '../../../dbConnection.js';

class SelectTemplateOverview {
  async selectTemplateOverview(questionIsActive, templateIsActive, sectionIsActive) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      SELECT 
        t.templateID,
        t.name AS template_name,
        t.description AS template_description,
        ts.templateHasSectionID,
        ts.sectionID,
        ts.positionNumber AS section_position,
        s.name AS section_name,
        tq.templateHasQuestionID,
        tq.questionID,
        tq.positionNumber AS question_position,
        q.userID AS question_creator_userID,
        q.question,
        q.isActive AS question_isActive
      FROM 
        template t
      LEFT JOIN 
        templateHasSection ts ON t.templateID = ts.templateID
      LEFT JOIN 
        section s ON ts.sectionID = s.sectionID
      LEFT JOIN 
        templateHasQuestion tq ON ts.templateHasSectionID = tq.templateHasSectionID
      LEFT JOIN 
        question q ON tq.questionID = q.questionID
    WHERE 
      t.isActive = ? AND q.isActive = ? AND s.isActive = ?;
    `, [templateIsActive, questionIsActive, sectionIsActive]);
    connection.release();
    return { result };
  }
}

export { SelectTemplateOverview };
