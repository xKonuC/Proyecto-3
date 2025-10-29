import posgradoPool from '../../../posgradoDbConnection.js';

class DeleteSemester {
  async deleteSemester(semesterIDs) {
    const placeholders = semesterIDs.map(() => '?').join(', ');

    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    delete from semester where semesterID in (${placeholders})
    `, semesterIDs);
    connection.release();
    return { result };
  }
}

export { DeleteSemester };
