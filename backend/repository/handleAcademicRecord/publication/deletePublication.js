import pool from '../../../dbConnection.js';

class DeletePublication {
  async deletePublication(publicationIDs, userID) {
    const placeholders = publicationIDs.map(() => '?').join(', ');

    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    delete from publication where userID = ? and publicationID in (${placeholders})
    `, [userID, ...publicationIDs]);
    connection.release();
    return { result };
  }
}

export { DeletePublication };
