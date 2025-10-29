import posgradoPool from '../../../posgradoDbConnection.js';

class GetRubricHasQuestion {
  async getRubricHasQuestion(rubricID) {
    const connection = await posgradoPool.getConnection();
    try {
      const query = `
        SELECT 
          rhq.rubricHasQuestionID
        FROM 
          rubric r
          JOIN rubricHasSection rhs ON r.rubricID = rhs.rubricID
          JOIN rubricHasQuestion rhq ON rhq.rubricHasSectionID = rhs.rubricHasSectionID
        WHERE 
          r.rubricID = ?`;
      const [result] = await connection.query(query, [rubricID]);
      return { result };
    } finally {
      if (connection) connection.release();
    }
  }
}

export { GetRubricHasQuestion };
