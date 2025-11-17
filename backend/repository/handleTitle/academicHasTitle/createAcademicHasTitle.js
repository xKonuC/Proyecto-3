import posgradoPool from '../../../posgradoDbConnection.js';

class CreateAcademicHasTitle {
  async createAcademicHasTitle(archiveURL, titleYear, studyField, userID, titleID, formatID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    insert into academicHasTitle (archiveURL, titleYear, studyField, userID, titleID, formatID)
    values (?,?,?,?,?,?)    
    `, [archiveURL, titleYear, studyField, userID, titleID, formatID]);
    connection.release();
    return { result };
  }
}

export { CreateAcademicHasTitle };
