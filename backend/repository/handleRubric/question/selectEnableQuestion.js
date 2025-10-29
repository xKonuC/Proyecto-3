import posgradoPool from '../../../posgradoDbConnection.js';

class SelectEnableQuestion {
  async selectEnableQuestion(isActive = 1) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from question where isActive = ?;
    `, [isActive]);
    connection.release();
    return { result };
  }
}

export { SelectEnableQuestion };
