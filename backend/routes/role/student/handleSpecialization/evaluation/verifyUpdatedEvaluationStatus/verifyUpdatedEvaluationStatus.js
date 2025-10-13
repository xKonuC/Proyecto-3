const verifyUpdatedEvaluationStatus = async (req, res, next) => {
  const {
    evaluationStatusID, evaluationTypeID, // Estado de evaluación actual
  } = req.body;

  try {
    // Verificar si el estado de evaluación es nulo(valor por defecto al crear un studentHasSemester) o tiene un valor válido 1(Sin asignación), 5(Aprobado con observaciones) o 6 (Reprobado en primer intento))
    if ([1, 5, 6].includes(evaluationStatusID)) {
      req.body.evaluationStatusID_evaluatorID = null;
      next();
    } else if ((evaluationTypeID == 1 && evaluationStatusID == 2)) {
      // Se actualizan los estados a 8(Versión corregida) con los cuales el encargado podrá asignar una rubrica
      req.body.evaluationStatusID_evaluatorID = 8;
      next();
    } else {
      // Si no cumple con las condiciones de evaluación, devolver un error
      return res.status(400).json({ error: 'No puedes actualizar la evaluación durante esta Etapa o Estado de Evaluación' });
    }
  } catch (error) {
    // Manejar errores
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export default verifyUpdatedEvaluationStatus;
