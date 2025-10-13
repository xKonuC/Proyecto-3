import { SelectEvaluation } from '../../../../../../repository/handleSpecialization/evaluationView/selectEvaluation.js';

const listEvaluation = async (req, res) => {
  const { evaluationTypeID } = req.body;
  const selectEvaluationInstance = new SelectEvaluation();
  try {
    const data = await selectEvaluationInstance.selectEvaluation(evaluationTypeID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listEvaluation;
