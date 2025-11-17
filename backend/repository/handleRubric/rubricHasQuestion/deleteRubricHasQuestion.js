import posgradoPool from '../../../posgradoDbConnection.js';

class DeleteRubricHasQuestion {
  async deleteRubricHasQuestion(rubricHasQuestionIDs) {
    const placeholders = rubricHasQuestionIDs.map(() => '?').join(', ');
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    delete from rubricHasQuestion
    where rubricHasQuestionID in (${placeholders});
    `, [...rubricHasQuestionIDs]);
    connection.release();
    return { result };
  }
}

export { DeleteRubricHasQuestion };
