import pool from '../../../dbConnection.js';

class DeleteThesisRegistration {
  async deleteThesisRegistration(thesisRegistrationIDs) {
    const placeholders = thesisRegistrationIDs.map(() => '?').join(', ');

    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    delete from thesisRegistration where thesisRegistrationID in (${placeholders})
    `, thesisRegistrationIDs);
    connection.release();
    return { result };
  }
}

export { DeleteThesisRegistration };
