import pool from '../../../dbConnection.js';

class DeleteConsultancy {
  async deleteConsultancy(consultancyIDs, userID) {
    const placeholders = consultancyIDs.map(() => '?').join(', ');

    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    delete from consultancy where userID = ? and consultancyID in (${placeholders})
    `, [userID, ...consultancyIDs]);
    connection.release();
    return { result };
  }
}

export { DeleteConsultancy };
