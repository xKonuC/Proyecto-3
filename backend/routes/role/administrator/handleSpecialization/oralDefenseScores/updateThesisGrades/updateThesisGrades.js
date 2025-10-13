import { UpdateGrade3 } from '../../../../../../repository/handleSpecialization/thesisGrades/updateGrade3.js';

const updateEvaluate = async (req, res) => {
  const {
    thesisGradesID, grade1, grade2, grade3, grade4, grade5,
  } = req.body;

  // Convertir las notas a números, asegurando que las que sean null no se consideren
  const numericGrade1 = parseFloat(grade1);
  const numericGrade2 = parseFloat(grade2);
  const numericGrade3 = parseFloat(grade3);
  const numericGrade4 = grade4 !== null ? parseFloat(grade4) : null;
  const numericGrade5 = parseFloat(grade5);

  // Inicializar variables para la suma de las notas y el contador de notas válidas
  let sum = numericGrade1 + numericGrade2 + numericGrade3 + numericGrade5;
  let count = 4;

  // Si grade4 no es null, agregarlo a la suma y al contador
  if (numericGrade4 !== null) {
    sum += numericGrade4;
    // eslint-disable-next-line no-plusplus
    count++;
  }

  try {
    // Calcular el promedio de las notas
    const averageGrade = (sum / count).toFixed(1);

    // Actualización de la nota 3 que representa la nota promedio de la Defensa Oral
    const updateGrade3Instance = new UpdateGrade3();
    await updateGrade3Instance.updateGrade3(thesisGradesID, averageGrade);

    res.status(200).json({ verificationMessage: 'Se actualizó exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export default updateEvaluate;
