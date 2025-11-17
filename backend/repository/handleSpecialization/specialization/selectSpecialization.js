import posgradoPool from '../../../posgradoDbConnection.js';

class SelectSpecialization {
  async selectSpecialization() {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from specialization;
    `);
    connection.release();
    return { result };
  }
}

export { SelectSpecialization };
