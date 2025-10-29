import posgradoPool from '../../../posgradoDbConnection.js';

class DeleteBookChapter {
  async deleteBookChapter(bookChapterIDs, userID) {
    const placeholders = bookChapterIDs.map(() => '?').join(', ');

    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    delete from bookChapter where userID = ? and bookChapterID in (${placeholders})
    `, [userID, ...bookChapterIDs]);
    connection.release();
    return { result };
  }
}

export { DeleteBookChapter };
