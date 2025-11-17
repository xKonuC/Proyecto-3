import posgradoPool from '../../../posgradoDbConnection.js';

class DeleteTitle {
  async deleteTitle(titleIDs) {
    const placeholders = titleIDs.map(() => '?').join(', ');
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    delete from title
    where titleID in (${placeholders})
    `, titleIDs);
    connection.release();
    return { result };
  }
}

export { DeleteTitle };
