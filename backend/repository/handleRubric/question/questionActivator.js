import pool from '../../../dbConnection.js';

class QuestionActivator {
  async questionActivator(questionIDs, isActive) {
    const connection = await pool.getConnection();
    const placeholders = questionIDs.map(() => '?').join(',');
    const [result] = await connection.execute(`
      UPDATE question 
      SET isActive = ?
      WHERE questionID IN (${placeholders});
    `, [isActive, ...questionIDs]);
    connection.release();
    return { result };
  }
}

export { QuestionActivator };
