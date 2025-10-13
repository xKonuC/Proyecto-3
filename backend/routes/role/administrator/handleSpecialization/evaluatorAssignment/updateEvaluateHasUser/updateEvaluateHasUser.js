import { UpdatePreprojectEvaluator } from '../../../../../../repository/handleSpecialization/preprojectEvaluator/updatePreprojectEvaluator.js';
import { UpdateThesisEvaluator } from '../../../../../../repository/handleSpecialization/thesisEvaluator/updateThesisEvaluator.js';

const updateEvaluateHasUser = async (req, res, next) => {
  const {
    stage, evaluationTypeID, evaluator1ID, evaluator2ID, evaluator1_userID, evaluator2_userID,
  } = req.body;

  try {
    if (evaluationTypeID == 1) {
      // Actualizar evaluadores para evaluación de anteproyecto
      const updatePreprojectEvaluatorInstance = new UpdatePreprojectEvaluator();
      await updatePreprojectEvaluatorInstance.updatePreprojectEvaluator(evaluator1ID, evaluator1_userID);
      await updatePreprojectEvaluatorInstance.updatePreprojectEvaluator(evaluator2ID, evaluator2_userID);
    } else if (evaluationTypeID == 2) {
      // Actualizar evaluadores para evaluación de tesis
      const updateThesisEvaluatorInstance = new UpdateThesisEvaluator();
      if (stage == 1) {
        // Etapas 1: Actualizar evaluadores A y B
        await updateThesisEvaluatorInstance.updateThesisEvaluator(evaluator1ID, evaluator1_userID);
        await updateThesisEvaluatorInstance.updateThesisEvaluator(evaluator2ID, evaluator2_userID);
      } else if (stage == 2) {
        // Etapas 2: Actualizar director
        await updateThesisEvaluatorInstance.updateThesisEvaluator(evaluator1ID, evaluator1_userID);
      } else if (stage == 3) {
        // Etapa 3: Actualizar codirector(opcional)
        await updateThesisEvaluatorInstance.updateThesisEvaluator(evaluator1ID, evaluator1_userID);
      } else if (stage == 4) {
        // Etapa 3: Actualizar director del programa
        await updateThesisEvaluatorInstance.updateThesisEvaluator(evaluator1ID, evaluator1_userID);
      }
    }
    next();
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export default updateEvaluateHasUser;
