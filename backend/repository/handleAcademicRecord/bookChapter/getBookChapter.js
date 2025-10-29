import posgradoPool from '../../../posgradoDbConnection.js';

class GetBookChapter {
  async getBookChapter(userID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    select * from bookChapter where userID = ?;
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { GetBookChapter };
