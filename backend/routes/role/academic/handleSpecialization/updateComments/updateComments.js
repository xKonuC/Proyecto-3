import { UpdateEvaluationStatusID } from '../../../../../repository/handleSpecialization/evaluation/updateEvaluationStatusID.js';
import { UpdateComments } from '../../../../../repository/handleSpecialization/preprojectEvaluator/updateComments.js';

const updateComments = async (req, res) => {
  const {
    preprojectEvaluatorID, userID, comment1, comment2, comment3, comment4, comment5, comment6, comment7, reviewCompleted, evaluationID,
  } = req.body;
  const updateCommentsInstance = new UpdateComments();
  const updateEvaluationStatusIDInstance = new UpdateEvaluationStatusID();
  try {
    // Se actualizan los estados a 7(Anteproyecto revisado), el cual le indica al estudiante que fue revisado
    await updateCommentsInstance.updateComments(preprojectEvaluatorID, userID, 7, comment1, comment2, comment3, comment4, comment5, comment6, comment7);
    if (reviewCompleted) {
      await updateEvaluationStatusIDInstance.updateEvaluationStatusID(evaluationID, 7);
    }
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateComments;
