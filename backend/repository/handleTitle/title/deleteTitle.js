import pool from '../../../dbConnection.js';

class DeleteTitle {
  async deleteTitle(titleIDs) {
    const placeholders = titleIDs.map(() => '?').join(', ');
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    delete from title
    where titleID in (${placeholders})
    `, titleIDs);
    connection.release();
    return { result };
  }
}

export { DeleteTitle };
