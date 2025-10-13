import pool from '../../../dbConnection.js';

class CreateEvaluatorAnswer {
  async createAnswer(preprojectEvaluatorID, rubricHasQuestionID, answer) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    INSERT INTO evaluatorAnswer (preprojectEvaluatorID, rubricHasQuestionID, answer)
    VALUES (?, ?, ?);
    `, [preprojectEvaluatorID, rubricHasQuestionID, answer]);
    connection.release();
    return { result };
  }
}

export { CreateEvaluatorAnswer };
