/* eslint-disable eqeqeq */
import pool from '../../../dbConnection.js';

class GetLastEvaluation {
  async getLastEvaluation(evaluationTypeID, studentHasSemesterID) {
    let query = `
      SELECT 
        ev.rubricID,
        ev.evaluationStatusID`;

    if (evaluationTypeID == 1) {
      query += `,
        ppe.userID AS evaluatorID_1,
        ppe2.userID AS evaluatorID_2`;
    } else if (evaluationTypeID == 2) {
      query += `,
        the.userID AS evaluatorID_1,
        the2.userID AS evaluatorID_2,
        the3.userID AS evaluatorID_3,
        the4.userID AS evaluatorID_4,
        the5.userID AS evaluatorID_5`;
    }

    query += `
      FROM 
        evaluation ev`;

    if (evaluationTypeID == 1) {
      query += `
      LEFT JOIN 
        preprojectEvaluator ppe ON ev.evaluationID = ppe.evaluationID AND ppe.evaluatorCategoryID = 2
      LEFT JOIN 
        preprojectEvaluator ppe2 ON ev.evaluationID = ppe2.evaluationID AND ppe2.evaluatorCategoryID = 3`;
    } else if (evaluationTypeID == 2) {
      query += `
        LEFT JOIN 
          thesisEvaluator the ON ev.evaluationID = the.evaluationID AND the.evaluatorCategoryID = 2
        LEFT JOIN 
          thesisEvaluator the2 ON ev.evaluationID = the2.evaluationID AND the2.evaluatorCategoryID = 3
        LEFT JOIN 
          thesisEvaluator the3 ON ev.evaluationID = the3.evaluationID AND the3.evaluatorCategoryID = 4
        LEFT JOIN 
          thesisEvaluator the4 ON ev.evaluationID = the4.evaluationID AND the4.evaluatorCategoryID = 5
        LEFT JOIN 
          thesisEvaluator the5 ON ev.evaluationID = the5.evaluationID AND the5.evaluatorCategoryID = 6`;
    }

    query += `
      WHERE 
        ev.studentHasSemesterID = ?
      ORDER BY 
        ev.evaluationID DESC
      LIMIT 1;`;

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(query, [studentHasSemesterID]);
      connection.release();
      return { result };
    } catch (error) {
      connection.release();
      throw error;
    }
  }
}

export { GetLastEvaluation };
