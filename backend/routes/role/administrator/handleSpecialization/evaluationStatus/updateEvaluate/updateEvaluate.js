import { UpdateEvaluationStatusID } from '../../../../../../repository/handleSpecialization/evaluation/updateEvaluationStatusID.js';

const updateEvaluate = async (req, res, next) => {
  const {
    evaluationID, evaluationStatusID,
  } = req.body;
  const updateEvaluationStatusIDInstance = new UpdateEvaluationStatusID();
  try {
    await updateEvaluationStatusIDInstance.updateEvaluationStatusID(evaluationID, evaluationStatusID);
    next();
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateEvaluate;
