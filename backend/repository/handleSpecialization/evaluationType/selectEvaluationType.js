import posgradoPool from '../../../posgradoDbConnection.js';

class SelectEvaluationType {
  async selectEvaluationType() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from evaluationType;
    `);
    connection.release();
    return { result };
  }
}

export { SelectEvaluationType };
