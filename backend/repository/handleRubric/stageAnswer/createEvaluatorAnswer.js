import posgradoPool from '../../../posgradoDbConnection.js';

class CreateStageAnswer {
  async createAnswer(thesisEvaluatorID, rubricHasQuestionID, answer) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    INSERT INTO stageAnswer (thesisEvaluatorID, rubricHasQuestionID, answer)
    VALUES (?, ?, ?);
    `, [thesisEvaluatorID, rubricHasQuestionID, answer]);
    connection.release();
    return { result };
  }
}

export { CreateStageAnswer };
