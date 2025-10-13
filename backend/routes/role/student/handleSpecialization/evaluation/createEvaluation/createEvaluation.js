import { CreateEvaluation } from '../../../../../../repository/handleSpecialization/evaluation/createEvaluation.js';
import { CreateThesisGrades } from '../../../../../../repository/handleSpecialization/thesisGrades/createThesisGrades.js';
import getTimestamp from '../../../../../../utils/getTimestamp.js';
import calculateDifferenceInMinutes from '../../../../../../utils/calculateDifferenceInMinutes.js';

const createEvaluation = async (req, res, next) => {
  const {
    studentHasSemesterID, formatID, archiveURL, evaluationTypeID, dueDate, rubricID,
  } = req.body;
  const createEvaluationInstance = new CreateEvaluation();
  try {
    let insertId = null;

    // Si es tesis antes debo crear las notas para esa evaluación previamente
    if (evaluationTypeID == 2) {
      const createThesisGradesInstance = new CreateThesisGrades();
      insertId = await createThesisGradesInstance.createThesisGrades();
    }

    const creationDate = getTimestamp();
    // comparar toDate con creationDate para ver si se subió se subió a tiempo y guardarlo en evaluation
    const lateMinutes = calculateDifferenceInMinutes(creationDate, dueDate);
    req.body.evaluationID = await createEvaluationInstance.createEvaluation(archiveURL, formatID, studentHasSemesterID, lateMinutes, insertId, creationDate, rubricID);
    next();
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createEvaluation;
