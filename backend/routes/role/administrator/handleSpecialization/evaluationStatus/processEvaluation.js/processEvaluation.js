/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import { UpdateEvaluationStatusID } from '../../../../../../repository/handleSpecialization/evaluation/updateEvaluationStatusID.js';
import { UpdateEvaluationStatus } from '../../../../../../repository/handleSpecialization/studentHasSemester/updateEvaluationStatus.js';
import { ApprovalSpecialization } from '../../../../../../repository/handleSpecialization/studentHasSpecialization/approvalSpecialization.js';
import { UpdateThesisGrades } from '../../../../../../repository/handleSpecialization/thesisGrades/updateThesisGrades.js';

const calculateProjectStatus = (evaluationStatuses) => {
  /* const statusCounts = {
    4: 0, // Rechazado
    6: 0, // Rechazado en primer intento
    5: 0, // Aprobado con observaciones
    3: 0, // Aprobado
    2: 0, // Sin Revision
  };
  */

  // Determinar el estado final usando switch
  const [evaluationStatus1ID, evaluationStatus2ID] = evaluationStatuses;
  switch (true) {
    case (evaluationStatus1ID === 3 && evaluationStatus2ID === 3):
      return { evaluationStatusID: 3 };
    case (evaluationStatus1ID === 3 && evaluationStatus2ID === 5) || (evaluationStatus1ID === 5 && evaluationStatus2ID === 3):
      return { evaluationStatusID: 5 };
    case (evaluationStatus1ID === 3 && evaluationStatus2ID === 4) || (evaluationStatus1ID === 4 && evaluationStatus2ID === 3):
      return { evaluationStatusID: 4 };
    case (evaluationStatus1ID === 3 && evaluationStatus2ID === 6) || (evaluationStatus1ID === 6 && evaluationStatus2ID === 3):
      return { evaluationStatusID: 6 };
    case (evaluationStatus1ID === 5 && evaluationStatus2ID === 4) || (evaluationStatus1ID === 4 && evaluationStatus2ID === 5):
      return { evaluationStatusID: 4 };
    case (evaluationStatus1ID === 5 && evaluationStatus2ID === 6) || (evaluationStatus1ID === 6 && evaluationStatus2ID === 5):
      return { evaluationStatusID: 6 };
    case (evaluationStatus1ID === 4 && evaluationStatus2ID === 6) || (evaluationStatus1ID === 6 && evaluationStatus2ID === 4):
      return { evaluationStatusID: 4 };
    default:
      return { evaluationStatusID: 2 }; // Estado por defecto
  }
};

const calculateThesisGrades = (grades) => {
  const {
    grade1, grade2, grade3, grade4, oralDefenseScore,
  } = grades;
  const average12 = ((grade3 + grade4) / 2); // 50% de la nota final
  const average34 = ((grade1 + grade2) / 2); // 30% de la nota final
  // Nota final es la suma del promedio de notas con sus respectivos ponderados (50%, 30% y 20%)
  const finalGrade = average12 * 0.5 + average34 * 0.3 + oralDefenseScore * 0.2; // 20% de la nota final

  // Redondear los resultados a dos decimales
  const roundedAverage12 = Math.round(average12 * 10) / 10;
  const roundedAverage34 = Math.round(average34 * 10) / 10;
  const roundedFinalGrade = Math.round(finalGrade * 10) / 10;

  return {
    average12: roundedAverage12,
    average34: roundedAverage34,
    finalGrade: roundedFinalGrade,
    evaluationStatusID: roundedFinalGrade >= 4.0 ? 3 : 6, // Aprobado si es >= 4.0, de lo contrario, Rechazado en primer intento
  };
};

// Función para procesar la evaluación de un proyecto
const processProjectEvaluation = (item) => {
  // Mapear los diferentes estados de evaluación del proyecto a sus respectivos IDs
  const evaluationStatuses = {
    evaluationStatus1ID: item.evaluationStatus1ID,
    evaluationStatus2ID: item.evaluationStatus2ID,
  };

  // Calcular el estado general del proyecto en función de sus diferentes estados de evaluación
  return calculateProjectStatus(Object.values(evaluationStatuses));
};

// Función para procesar la evaluación de una tesis
const processThesisEvaluation = (item) => {
  // Extraer las notas de la tesis y la puntuación de la defensa oral del objeto item
  const {
    grade1, grade2, grade3, grade4, oralDefenseScore,
  } = item;

  // Calcular la nota final de la tesis y determinar el estado de la evaluación
  return calculateThesisGrades({
    grade1,
    grade2,
    grade3,
    grade4,
    oralDefenseScore,
  });
};

const processEvaluation = async (req, res) => {
  const { dataArray, evaluationTypeID } = req.body;
  try {
    // Procesar cada elemento del dataArray en paralelo utilizando Promise.all y async/await
    await Promise.all(dataArray.map(async (item) => {
      // Determinar qué función de evaluación utilizar según el evaluationTypeID
      const result = evaluationTypeID == 1 ? processProjectEvaluation(item) : processThesisEvaluation(item);

      // Actualizar las notas de la tesis si evaluationTypeID es 2
      if (evaluationTypeID == 2) {
        await new UpdateThesisGrades().updateThesisGrades(item.thesisGradesID, result.finalGrade, result.average12, result.average34);
      }

      // Actualizar el estado de la evaluación de la evaluación y del tipo de evaluación tomada por el estudiante
      await new UpdateEvaluationStatusID().updateEvaluationStatusID(item.evaluationID, result.evaluationStatusID);
      await new UpdateEvaluationStatus().updateEvaluationStatus(item.studentHasSemesterID, result.evaluationStatusID);

      // Si evaluationTypeID es 2 y el estado de la evaluación es aprobado, actualizar la especialización del estudiante a aprobado(2)
      if (evaluationTypeID == 2 && result.evaluationStatusID == 3) {
        await new ApprovalSpecialization().approvalSpecialization(item.studentID, item.specializationID, 2, item.semesterID);
        // Crear campo en ThesisRepository
      }
    }));

    // Si todas las promesas se resuelven, envía el primer mensaje de éxito (podrías ajustarlo según tu lógica de negocio)
    res.status(200).json({ verificationMessage: 'Evaluación procesada y actualizada correctamente.' });
  } catch (error) {
    console.error('Error processing evaluations:', error);
    res.status(500).json({ message: 'Ocurrió un error al procesar las evaluaciones.' });
  }
};

export default processEvaluation;
