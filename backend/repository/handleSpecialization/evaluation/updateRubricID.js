import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateRubricID {
  async updateRubricID(evaluationID, rubricID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update evaluation set rubricID = ?
    where evaluationID = ?;
    `, [rubricID, evaluationID]);
    connection.release();
    return { result };
  }
}

export { UpdateRubricID };
