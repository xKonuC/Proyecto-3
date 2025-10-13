import pool from '../../../dbConnection.js';

class SelectAcademicsEvaluation {
  async selectAcademicsEvaluation(evaluationTypeID, userID) {
    let query = '';
    let params = [];

    if (evaluationTypeID == 1) {
      // Selecciona datos para la evaluación del proyecto preliminar con un académico guía.
      query = 'SELECT * FROM preprojectEvaluation WHERE academicA_userID = ? OR academicB_userID = ? ';
      params = [userID, userID];
    } else if (evaluationTypeID == 2) {
      // Selecciona datos para la evaluación de tesis con director o codirector.
      query = 'SELECT * FROM thesisEvaluation  WHERE academicA_userID = ? OR academicB_userID = ? OR director_userID = ? OR codirector_userID = ?';
      params = [userID, userID, userID, userID];
    }
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(query, params);
      connection.release();
      return { result };
    } catch (error) {
      connection.release();
      throw error;
    }
  }
}

export { SelectAcademicsEvaluation };
