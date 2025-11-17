import posgradoPool from '../../../posgradoDbConnection.js';

class CreatePublication {
  async createPublication(userID, authors, leadAuthor, type, year, isIndexed, title, journal, ISSN, status, accessURL) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    insert into publication (userID, authors, leadAuthor, type, year, isIndexed, title, journal, ISSN, status, accessURL)
    values (?,?,?,?,?,?,?,?,?,?,?)
    `, [userID, authors, leadAuthor, type, year, isIndexed, title, journal, ISSN, status, accessURL]);
    connection.release();
    return { result };
  }
}

export { CreatePublication };
