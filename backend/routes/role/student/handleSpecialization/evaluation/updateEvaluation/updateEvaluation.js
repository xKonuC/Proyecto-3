import { UpdateEvaluation } from '../../../../../../repository/handleSpecialization/evaluation/updateEvaluation.js';
import calculateDifferenceInMinutes from '../../../../../../utils/calculateDifferenceInMinutes.js';
import getTimestamp from '../../../../../../utils/getTimestamp.js';

const updateEvaluation = async (req, res) => {
  const {
    evaluationID, formatID, archiveURL, dueDate, evaluationStatusID_evaluatorID,
  } = req.body;
  const updateEvaluationInstance = new UpdateEvaluation();
  try {
    const updateDate = getTimestamp();
    const lateMinutes = calculateDifferenceInMinutes(updateDate, dueDate);
    await updateEvaluationInstance.updateEvaluation(evaluationID, archiveURL, formatID, updateDate, lateMinutes, evaluationStatusID_evaluatorID);
    res.status(200).json({ verificationMessage: 'El documento fue actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateEvaluation;
