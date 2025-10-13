import pool from '../../../dbConnection.js';

class UpdateBookChapter {
  async updateBookChapter(bookChapterID, userID, authors, leadAuthor, type, year, bookName, chapterName, place, editorial, status, accessURL) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update bookChapter set
    authors = ?, leadAuthor = ?, type = ?, year = ?, bookName = ?, chapterName = ?, place = ?, editorial = ?, status = ?, accessURL = ?
    where bookChapterID = ? and userID = ?;
    `, [authors, leadAuthor, type, year, bookName, chapterName, place, editorial, status, accessURL, bookChapterID, userID]);
    connection.release();
    return { result };
  }
}

export { UpdateBookChapter };
