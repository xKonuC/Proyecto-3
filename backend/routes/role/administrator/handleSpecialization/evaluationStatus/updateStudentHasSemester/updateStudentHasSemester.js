import { UpdateEvaluationStatus } from '../../../../../../repository/handleSpecialization/studentHasSemester/updateEvaluationStatus.js';

const updateStudentHasSemester = async (req, res, next) => {
  const {
    studentHasSemesterID, evaluationStatusID, evaluationTypeID,
  } = req.body;
  const updateEvaluationStatusInstance = new UpdateEvaluationStatus();
  try {
    await updateEvaluationStatusInstance.updateEvaluationStatus(studentHasSemesterID, evaluationStatusID);

    if (evaluationTypeID == 1) {
      // Enviar Correo de que aprobé el anteproyecto
      return res.status(200).json({ verificationMessage: 'Se actualizó exitosamente' });
    }

    // Como evaluationStatusID es 3(aprobado)
    if (evaluationTypeID == 2) {
      if (evaluationStatusID == 3) {
        next();
        return;
      }
      res.status(200).json({ verificationMessage: 'Se actualizó exitosamente' });
    }
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateStudentHasSemester;
