import posgradoPool from '../../../posgradoDbConnection.js';

class DeleteTemplateHasQuestion {
  async deleteTemplateHasQuestion(templateHasQuestionIDs) {
    const placeholders = templateHasQuestionIDs.map(() => '?').join(', ');
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    delete from templateHasQuestion
    where templateHasQuestionID in (${placeholders});
    `, [...templateHasQuestionIDs]);
    connection.release();
    return { result };
  }
}

export { DeleteTemplateHasQuestion };
