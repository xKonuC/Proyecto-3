import pool from '../../../dbConnection.js';
import { convertToTime } from '../../../utils/convertToTime.js';

class CreateSemester {
  async createSemester(semesterNumber, year, startDate, finishDate) {
    const formattedStartDate = convertToTime(startDate);
    const formattedFinishDate = convertToTime(finishDate);
    const connection = await pool.getConnection();
    const [result] = await connection.execute(`
    insert into semester (startDate, finishDate, semesterNumber, year)
    values (?,?,?,?)
    `, [formattedStartDate, formattedFinishDate, semesterNumber, year]);
    connection.release();
    return { result };
  }
}

export { CreateSemester };
