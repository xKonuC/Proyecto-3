import pool from '../../../dbConnection.js';

class CreatePublication {
  async createPublication(userID, authors, leadAuthor, type, year, isIndexed, title, journal, ISSN, status, accessURL) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into publication (userID, authors, leadAuthor, type, year, isIndexed, title, journal, ISSN, status, accessURL)
    values (?,?,?,?,?,?,?,?,?,?,?)
    `, [userID, authors, leadAuthor, type, year, isIndexed, title, journal, ISSN, status, accessURL]);
    connection.release();
    return { result };
  }
}

export { CreatePublication };
