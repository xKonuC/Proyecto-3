import pool from '../../../dbConnection.js';

class UpdateSection {
  async updateSection(sectionID, name) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update section set name = ?
    where sectionID = ?
    `, [name, sectionID]);
    connection.release();
    return { result };
  }
}

export { UpdateSection };
