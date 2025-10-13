import pool from '../../../dbConnection.js';
import { convertToTime } from '../../../utils/convertToTime.js';

class CreatePatent {
  async createPatent(userID, inventors, patentName, applicationDate, publicationDate, registrationNumber, status, accessURL) {
    const formattedApplicationDate = convertToTime(applicationDate);
    const formattedPublicationDate = convertToTime(publicationDate);
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into patent (userID, inventors, patentName, applicationDate, publicationDate, registrationNumber, status, accessURL)
    values (?,?,?,?,?,?,?,?)
    `, [userID, inventors, patentName, formattedApplicationDate, formattedPublicationDate, registrationNumber, status, accessURL]);
    connection.release();
    return { result };
  }
}

export { CreatePatent };
