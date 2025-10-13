import pool from '../../../dbConnection.js';
import { convertToTime } from '../../../utils/convertToTime.js';

class UpdatePatent {
  async updatePatent(patentID, userID, inventors, patentName, applicationDate, publicationDate, registrationNumber, status, accessURL) {
    const formattedApplicationDate = convertToTime(applicationDate);
    const formattedPublicationDate = convertToTime(publicationDate);
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    update patent set
    inventors = ?, patentName = ?, applicationDate = ?, publicationDate = ?, registrationNumber = ?, status = ?, accessURL = ?
    where patentID = ? and userID = ?;
    `, [inventors, patentName, formattedApplicationDate, formattedPublicationDate, registrationNumber, status, accessURL, patentID, userID]);
    connection.release();
    return { result };
  }
}

export { UpdatePatent };
