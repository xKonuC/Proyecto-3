import pool from '../../../dbConnection.js';

class SelectTemplateByID {
  async selectTemplateByID(templateID, questionIsActive, sectionIsActive) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
      SELECT 
        ts.sectionID,
        s.name AS section_name,
        tq.questionID,
        q.question
      FROM 
        templateHasSection ts
      LEFT JOIN 
        section s ON ts.sectionID = s.sectionID
      LEFT JOIN 
        templateHasQuestion tq ON ts.templateHasSectionID = tq.templateHasSectionID
      LEFT JOIN 
        question q ON tq.questionID = q.questionID
      WHERE 
        ts.templateID = ? AND q.isActive = ? AND s.isActive = ?;
    `, [templateID, questionIsActive, sectionIsActive]);
    connection.release();

    // Organizar los resultados en un arreglo de secciones con preguntas
    const sections = {};
    result.forEach((row) => {
      if (!sections[row.sectionID]) {
        sections[row.sectionID] = {
          sectionID: row.sectionID,
          section_name: row.section_name,
          questions: [],
        };
      }
      sections[row.sectionID].questions.push({
        questionID: row.questionID,
        question: row.question,
      });
    });

    // Convertir el objeto de secciones en un arreglo
    const sectionsArray = Object.values(sections);
    return { sections: sectionsArray };
  }
}

export { SelectTemplateByID };
