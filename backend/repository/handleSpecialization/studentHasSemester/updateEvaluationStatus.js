import posgradoPool from '../../../posgradoDbConnection.js';

class UpdateEvaluationStatus {
  async updateEvaluationStatus(studentHasSemesterID, evaluationStatusID) {
    const connection = await posgradoPool.getConnection();
    const [result] = await connection.execute(`
    update studentHasSemester set
    evaluationStatusID = ?
    where studentHasSemesterID = ?
    `, [evaluationStatusID, studentHasSemesterID]);
    connection.release();
    return { result };
  }
}

export { UpdateEvaluationStatus };
