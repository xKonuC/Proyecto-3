import { SelectEvaluationStatus } from '../../../../../../repository/handleSpecialization/evaluationStatus/selectEvaluationStatus.js';

const listEvaluationStatus = async (req, res) => {
  const selectEvaluationStatusInstance = new SelectEvaluationStatus();
  try {
    const data = await selectEvaluationStatusInstance.selectEvaluationStatus([3, 4, 5, 6]);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listEvaluationStatus;
