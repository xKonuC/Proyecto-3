import pool from '../../../dbConnection.js';

class SelectStudentHasTitle {
  async selectStudentHasTitle(userID) {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    SELECT
    sht.studentHasTitleID,
    sht.titleYear,
    sht.archiveURL,
    (SELECT JSON_OBJECT('name', format.name) FROM format format WHERE format.formatID = sht.formatID) AS format,
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
     WHERE title.titleID = sht.titleID) AS title
  FROM studentHasTitle sht
  WHERE sht.userID = ?;  
    `, [userID]);
    connection.release();
    return { result };
  }
}

export { SelectStudentHasTitle };
