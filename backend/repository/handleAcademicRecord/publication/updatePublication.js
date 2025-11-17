import posgradoPool from '../../../posgradoDbConnection.js';

class UpdatePublication {
  async updatePublication(publicationID, userID, authors, leadAuthor, type, year, isIndexed, title, journal, ISSN, status, accessURL) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update publication set
    authors = ?, leadAuthor = ?, type = ?, year = ?, isIndexed = ?, title = ?, journal = ?, ISSN = ?, status = ?, accessURL = ?
    where publicationID = ? and userID = ?;
    `, [authors, leadAuthor, type, year, isIndexed, title, journal, ISSN, status, accessURL, publicationID, userID]);
    connection.release();
    return { result };
  }
}

export { UpdatePublication };
