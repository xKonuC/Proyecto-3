import { UpdateEvaluationStatusID } from '../../../../../../repository/handleSpecialization/evaluation/updateEvaluationStatusID.js';
import { UpdateEvaluationStatus } from '../../../../../../repository/handleSpecialization/studentHasSemester/updateEvaluationStatus.js';

const updateEvaluationStatus = async (req, res) => {
  const {
    studentHasSemesterID, evaluationID,
  } = req.body;
  const updateEvaluationStatusInstance = new UpdateEvaluationStatus();
  const updateEvaluationStatusIDInstance = new UpdateEvaluationStatusID();
  try {
    // evaluationStatusID = 2(Académicos asignados), con el cual el estudiante no podrá actualizar su evaluación durante su primera subida
    await updateEvaluationStatusInstance.updateEvaluationStatus(studentHasSemesterID, 2);
    await updateEvaluationStatusIDInstance.updateEvaluationStatusID(evaluationID, 2);
    res.status(200).json({ verificationMessage: 'Se ha actualizado exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateEvaluationStatus;
