import posgradoPool from '../../../posgradoDbConnection.js';
import { convertToTime } from '../../../utils/convertToTime.js';

class UpdateSemester {
  async updateSemester(semesterID, semesterNumber, year, startDate, finishDate) {
    const formattedStartDate = convertToTime(startDate);
    const formattedFinishDate = convertToTime(finishDate);
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update semester set
    startDate = ?,
    finishDate = ?,
    semesterNumber = ?,
    year = ?
    where semesterID = ?
    `, [formattedStartDate, formattedFinishDate, semesterNumber, year, semesterID]);
    connection.release();
    return { result };
  }
}

export { UpdateSemester };
