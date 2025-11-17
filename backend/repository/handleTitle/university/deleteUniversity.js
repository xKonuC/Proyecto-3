import posgradoPool from '../../../posgradoDbConnection.js';

class DeleteUniversity {
  async deleteUniversity(universityIDs) {
    const placeholders = universityIDs.map(() => '?').join(', ');
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    delete from university
    where universityID in (${placeholders})
    `, universityIDs);
    connection.release();
    return { result };
  }
}

export { DeleteUniversity };
