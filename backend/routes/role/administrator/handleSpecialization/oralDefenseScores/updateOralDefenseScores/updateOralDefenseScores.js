import { UpdateGrade2 } from '../../../../../../repository/handleSpecialization/thesisEvaluator/updateGrade2.js';

const updateOralDefenseScores = async (req, res, next) => {
  const {
    evaluator1ID, grade1,
    evaluator2ID, grade2,
    evaluator3ID, grade3,
    evaluator4ID, grade4,
    evaluator5ID, grade5,
  } = req.body;
  const updateGrade2Instance = new UpdateGrade2();
  try {
    const numericGrade1 = parseFloat(grade1).toFixed(1);
    const numericGrade2 = parseFloat(grade2).toFixed(1);
    const numericGrade3 = parseFloat(grade3).toFixed(1);
    const numericGrade4 = parseFloat(grade4).toFixed(1);
    const numericGrade5 = parseFloat(grade5).toFixed(1);
    // Notas de Evaluadores A y B para la Defensa Oral
    await updateGrade2Instance.updateGrade2(evaluator1ID, numericGrade1);
    await updateGrade2Instance.updateGrade2(evaluator2ID, numericGrade2);
    // Notas de Director y Codirector para la Defensa Oral
    await updateGrade2Instance.updateGrade2(evaluator3ID, numericGrade3);
    if (evaluator4ID) {
      await updateGrade2Instance.updateGrade2(evaluator4ID, numericGrade4);
    }
    // Notas de Director del Programa para la Defensa Oral
    await updateGrade2Instance.updateGrade2(evaluator5ID, numericGrade5);
    next();
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateOralDefenseScores;
