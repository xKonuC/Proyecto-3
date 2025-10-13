import pool from '../../../dbConnection.js';

class CreateStageAnswer {
  async createAnswer(thesisEvaluatorID, rubricHasQuestionID, answer) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    INSERT INTO stageAnswer (thesisEvaluatorID, rubricHasQuestionID, answer)
    VALUES (?, ?, ?);
    `, [thesisEvaluatorID, rubricHasQuestionID, answer]);
    connection.release();
    return { result };
  }
}

export { CreateStageAnswer };
