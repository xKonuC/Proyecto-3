import { UpdatePreprojectEvaluator } from '../../../../../../repository/handleSpecialization/preprojectEvaluator/updatePreprojectEvaluator2.js';
import { UpdateThesisEvaluator } from '../../../../../../repository/handleSpecialization/thesisEvaluator/updateThesisEvaluator2.js';

const updateEvaluator = async (req, res) => {
  const {
    evaluator1ID, comment, grade1, evaluationStatusID, evaluationTypeID,
  } = req.body;
  try {
    if (evaluationTypeID == 1) {
      const updateEvaluatorInstance = new UpdatePreprojectEvaluator();
      await updateEvaluatorInstance.updatePreprojectEvaluator(evaluator1ID, evaluationStatusID, comment);
    } else {
      const updateEvaluatorInstance = new UpdateThesisEvaluator();
      await updateEvaluatorInstance.updateThesisEvaluator(evaluator1ID, grade1, comment);
    }
    res.status(200).json({ verificationMessage: 'La información fue actualizado exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error: error.toString() });
    }
  }
};

export default updateEvaluator;
