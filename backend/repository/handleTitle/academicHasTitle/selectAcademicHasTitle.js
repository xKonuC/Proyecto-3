import pool from '../../../dbConnection.js';

class SelectAcademicHasTitle {
  async selectAcademicHasTitle(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    SELECT
    aht.academicHasTitleID,
    aht.titleYear,
    aht.archiveURL,
    aht.studyField,
    (SELECT JSON_OBJECT('name', format.name) FROM format format WHERE format.formatID = aht.formatID) AS format,
    (SELECT JSON_OBJECT(
        'titleID', title.titleID,
        'universityID', title.universityID,
        'universityName', title.universityName,
        'degreeID', title.degreeID,
        'name', title.name,
        'country', title.country,
        'city', title.city,
        'degree', title.degree,
        'type', title.type
     )
     FROM titleHasUniversity title 
     WHERE title.titleID = aht.titleID) AS title
  FROM academicHasTitle aht
  WHERE aht.userID = ?; 
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { SelectAcademicHasTitle };
