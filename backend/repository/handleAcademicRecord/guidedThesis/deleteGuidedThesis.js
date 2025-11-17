import posgradoPool from '../../../posgradoDbConnection.js';

class DeleteGuidedThesis {
  async deleteGuidedThesis(guidedThesisIDs, userID) {
    const placeholders = guidedThesisIDs.map(() => '?').join(', ');

    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    delete from guidedThesis where userID = ? and guidedThesisID in (${placeholders})
    `, [userID, ...guidedThesisIDs]);
    connection.release();
    return { result };
  }
}

export { DeleteGuidedThesis };
