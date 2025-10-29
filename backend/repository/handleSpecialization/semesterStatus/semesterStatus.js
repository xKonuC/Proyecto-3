import posgradoPool from '../../../posgradoDbConnection.js';

class SelectStatus {
  async selectStatus(semesterStatusIDs) {
    const placeholders = semesterStatusIDs.map(() => '?').join(', ');
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from semesterStatus where semesterStatusID in (${placeholders})
    ;`, semesterStatusIDs);
    connection.release();
    return { result };
  }
}

export { SelectStatus };
