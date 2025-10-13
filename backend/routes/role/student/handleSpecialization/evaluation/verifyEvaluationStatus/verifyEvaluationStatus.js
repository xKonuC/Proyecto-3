import { GetLastEvaluation } from '../../../../../../repository/handleSpecialization/evaluation/getLastEvaluation.js';

const verifyEvaluationStatus = async (req, res, next) => {
  const {
    evaluationStatusID,
    evaluationTypeID,
    studentHasSemesterID,
  } = req.body;

  try {
    // Verificar si el estado de evaluación es nulo(valor por defecto al crear un studentHasSemester)
    if (evaluationStatusID == null) {
      req.body.rubricID = null;
      next();
      return;
    }

    // Verificar si el estado de evaluación es 5(Aprobado con observaciones) o 6 (Reprobado en primer intento)), el anteproyecto puede aprobar con Aprobado con observaciones también
    if ([5, 6].includes(evaluationStatusID) || ([6].includes(evaluationStatusID) && evaluationTypeID == 1)) {
      // En caso de obtengo la información del ultimo evaluate con sus evaluadores asignados, obtener datos previos
      const getLastEvaluationInstance = new GetLastEvaluation();
      const { result } = await getLastEvaluationInstance.getLastEvaluation(evaluationTypeID, studentHasSemesterID);

      // Verificar si no tiene un estado de evaluación "Sin revisión" (2), con este medida evito que un estudiante puede subir mas de una evaluación
      const isApprovedOrWithObservations = result.some((obj) => obj.evaluationStatusID !== 1);

      // De este modo aseguro que un estudiante pueda subir varios documentos si tiene los estados 5(Aprobado con observaciones) o 6 (Reprobado en primer intento))
      if (isApprovedOrWithObservations) {
        req.body.rubricID = result[0].rubricID;
        req.body.evaluators = result[0];
        next();
      } else {
        return res.status(400).json({ error: 'Tienes Subido un Archivo sin Evaluar' });
      }
    } else {
      // Si no cumple con las condiciones de evaluación, devolver un error
      return res.status(400).json({ error: 'No puedes Subir Archivos durante este Estado de Evaluación' });
    }
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export default verifyEvaluationStatus;
