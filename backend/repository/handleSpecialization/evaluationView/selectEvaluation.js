/* eslint-disable eqeqeq */
import posgradoPool from '../../../posgradoDbConnection.js';

class SelectEvaluation {
  async selectEvaluation(evaluationTypeID) {
    let query = '';

    if (evaluationTypeID == 1) {
      // Selecciona datos para la evaluación del proyecto preliminar.
      query = 'SELECT * FROM preprojectEvaluation';
    } else if (evaluationTypeID == 2) {
      // Selecciona datos para la evaluación de tesis.
      query = 'SELECT * FROM thesisEvaluation';
    }
    const connection = await posgradoPool.getConnection();
    try {
      const [result] = await connection.execute(query);
      connection.release();
      return { result };
    } catch (error) {
      connection.release();
      throw error;
    }
  }
}

export { SelectEvaluation };
