import posgradoPool from '../../../posgradoDbConnection.js';

class DeleteAcademicHasTitle {
  async deleteAcademicHasTitle(academicHasTitleIDs, userID) {
    const placeholders = academicHasTitleIDs.map(() => '?').join(', ');
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
      DELETE FROM academicHasTitle 
      WHERE userID = ? 
      AND academicHasTitleID IN (${placeholders})
    `, [userID, ...academicHasTitleIDs]);
    connection.release();
    return { result };
  }
}

export { DeleteAcademicHasTitle };
