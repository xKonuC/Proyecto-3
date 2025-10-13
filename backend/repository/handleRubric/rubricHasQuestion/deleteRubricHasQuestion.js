import pool from '../../../dbConnection.js';

class DeleteRubricHasQuestion {
  async deleteRubricHasQuestion(rubricHasQuestionIDs) {
    const placeholders = rubricHasQuestionIDs.map(() => '?').join(', ');
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    delete from rubricHasQuestion
    where rubricHasQuestionID in (${placeholders});
    `, [...rubricHasQuestionIDs]);
    connection.release();
    return { result };
  }
}

export { DeleteRubricHasQuestion };
