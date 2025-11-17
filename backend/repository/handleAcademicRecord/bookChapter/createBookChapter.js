import posgradoPool from '../../../posgradoDbConnection.js';

class CreateBookChapter {
  async createBookChapter(userID, authors, leadAuthor, type, year, bookName, chapterName, place, editorial, status, accessURL) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    insert into bookChapter (userID, authors, leadAuthor, type, year, bookName, chapterName, place, editorial, status, accessURL)
    values (?,?,?,?,?,?,?,?,?,?,?)
    `, [userID, authors, leadAuthor, type, year, bookName, chapterName, place, editorial, status, accessURL]);
    connection.release();
    return { result };
  }
}

export { CreateBookChapter };
