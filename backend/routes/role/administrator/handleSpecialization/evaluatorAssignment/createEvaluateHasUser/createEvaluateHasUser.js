import { CreatePreprojectEvaluator } from '../../../../../../repository/handleSpecialization/preprojectEvaluator/createPreprojectEvaluator.js';
import { CreateThesisEvaluator } from '../../../../../../repository/handleSpecialization/thesisEvaluator/createThesisEvaluator.js';

const createEvaluateHasUser = async (req, res, next) => {
  const {
    evaluationTypeID, evaluator1_userID, evaluator2_userID, stage, evaluationID,
  } = req.body;
  try {
    if (evaluationTypeID == 1) {
      // Crear evaluadores A y B para evaluación de anteproyecto
      const createPreprojectEvaluatorInstance = new CreatePreprojectEvaluator();
      await createPreprojectEvaluatorInstance.createPreprojectEvaluator(evaluator1_userID, 2, evaluationID);
      await createPreprojectEvaluatorInstance.createPreprojectEvaluator(evaluator2_userID, 3, evaluationID);
    } else if (evaluationTypeID == 2) {
      // Crear evaluadores para evaluación de tesis
      const createThesisEvaluatorInstance = new CreateThesisEvaluator();
      if (stage == 1) {
        // Etapas 1: Crear evaluadores A y B
        await createThesisEvaluatorInstance.createThesisEvaluator(evaluator1_userID, 2, evaluationID);
        await createThesisEvaluatorInstance.createThesisEvaluator(evaluator2_userID, 3, evaluationID);
      } else if (stage == 2) {
        // Etapas 2: Crear director
        await createThesisEvaluatorInstance.createThesisEvaluator(evaluator1_userID, 4, evaluationID);
      } else if (stage == 3) {
        // Etapas 3: Crear codirector(opcional)
        await createThesisEvaluatorInstance.createThesisEvaluator(evaluator1_userID, 5, evaluationID);
      } else if (stage == 4) {
        // Etapa 4: Crear director del programa
        await createThesisEvaluatorInstance.createThesisEvaluator(evaluator1_userID, 6, evaluationID);
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

export default createEvaluateHasUser;
