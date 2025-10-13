import axios from 'axios';
import pool from '../../dbConnection.js';
import dotenv from 'dotenv'
import origin from '../../Origin.js';
dotenv.config()

class DeleteStorage2 {
  async deleteStorage2(studentHasTitleIDs, access_token) {
    const placeholders = studentHasTitleIDs.map(() => '?').join(', ');
    const connection = await pool.getConnection();
    const [files] = await connection.execute(`
    select archiveURL from studentHasTitle where studentHasTitleID in (${placeholders})
    `, studentHasTitleIDs);
    connection.release();
    const result = [];
    for (let i = 0; i < files.length; i++) {
      const url = files[i].archiveURL;

      const config = {
        headers: {
          'Authorization': 'Bearer ' + access_token,
          ...origin
        }
      }  
      const response = await axios.delete(`${process.env.FILESERVER_URL}/files/${url}`, config);
      result.push({ url: files[i].archiveURL, response: response.data });
    }
    return { result };
  }
}
export { DeleteStorage2 };
