import { UpdateSemesterStatusID } from '../../../../../../repository/handleSpecialization/studentHasSpecialization/updateSemesterStatusID2.js';
import { VerificationApproval } from '../../../../../../repository/handleSpecialization/studentHasSemester/verificationApproval.js';

const verificationApproval = async (req, res, next) => {
  const { evaluationTypeID, specializationID, userID } = req.body;
  const updateSemesterStatusIDInstance = new UpdateSemesterStatusID();
  const verificationApprovalInstance = new VerificationApproval();
  try {
    /*
      anteproyecto, actualizo semesterSemesterStatusID de studentHasSpecialization(studentHasSpecialization) a 5(En evaluación),
      con el cual ya no poder actualizar studentHasSpecialization(studentHasSpecialization) porque solo se podrá actualizar si
      semesterSemesterStatusID es 1(En proceso)
    */
    if (evaluationTypeID == 1) {
      await updateSemesterStatusIDInstance.updateSemesterStatusID(userID, specializationID, 5);
      next();
      /*
      tesis, verifica que haya aprobado(evaluationStatusID: 3, en AnteProyecto se permite aprobado con observaciones), el anteproyecto(evaluationTypeID: 1),
      */
    } else if (evaluationTypeID == 2) {
      const data = await verificationApprovalInstance.verificationApproval(1, userID, 3, 5);
      if (!data) {
        return res.status(409).json({ error: 'Aún no se ha aprobado el Anteproyecto' });
      }
      next();
    } else {
      return res.status(409).json({ error: 'El identificador del tipo de evaluación no es valido' });
    }
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default verificationApproval;
