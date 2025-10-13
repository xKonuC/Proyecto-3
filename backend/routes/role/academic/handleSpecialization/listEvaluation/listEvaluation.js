import { SelectAcademicsEvaluation } from '../../../../../repository/handleSpecialization/evaluationView/selectAcademicsEvaluation.js';

const listEvaluation = async (req, res) => {
  const { evaluationTypeID, userID } = req.body;
  const selectAcademicsEvaluationInstance = new SelectAcademicsEvaluation();
  try {
    const data = await selectAcademicsEvaluationInstance.selectAcademicsEvaluation(evaluationTypeID, userID);
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
