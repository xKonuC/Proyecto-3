import axios from 'axios';
import dotenv from 'dotenv';
import pool from '../../dbConnection.js';
import origin from '../../Origin.js';

dotenv.config();

class DeleteStorage3 {
  async deleteStorage3(bodyAcademicIDs, access_token) {
    const placeholders = bodyAcademicIDs.map(() => '?').join(', ');
    const connection = await pool.getConnection();
    const [files] = await connection.execute(`
    select archiveURL from academicHasTitle where academicHasTitleID in (${placeholders})
    `, bodyAcademicIDs);
    connection.release();
    const result = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < files.length; i++) {
      const url = files[i].archiveURL;
      const config = {
        headers: {
          Authorization: `Bearer ${access_token}`,
          ...origin,
        },
      };
      const response = await axios.delete(`${process.env.FILESERVER_URL}/files/${url}`, config);
      result.push({ url: files[i].archiveURL, response: response.data });
    }
    return { result };
  }
}
export { DeleteStorage3 };
