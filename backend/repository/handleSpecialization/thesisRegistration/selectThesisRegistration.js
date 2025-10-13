import pool from '../../../dbConnection.js';

class SelectThesisRegistration {
  async selectThesisRegistration() {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    SELECT 
    tr.thesisRegistrationID,
    s.userID AS studentID,
    CONCAT(s.firstName, ' ', s.secondName, ' ', s.surname1, ' ', s.surname2) AS studentName,
    d.userID AS directorID,
    CONCAT(d.firstName, ' ', d.secondName, ' ', d.surname1, ' ', d.surname2) AS directorName,
    cd.userID AS codirectorID,
    CONCAT(cd.firstName, ' ', cd.secondName, ' ', cd.surname1, ' ', cd.surname2) AS codirectorName,
    tr.title
    FROM 
      thesisRegistration tr
    LEFT JOIN 
      user s ON tr.studentID = s.userID
    LEFT JOIN 
      user d ON tr.directorID = d.userID
    LEFT JOIN 
      user cd ON tr.codirectorID = cd.userID;
    `);
    connection.release();
    return { result };
  }
}

export { SelectThesisRegistration };
