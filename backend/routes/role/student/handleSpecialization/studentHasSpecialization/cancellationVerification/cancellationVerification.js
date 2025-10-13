import { GetStudentHasSpecialization } from '../../../../../../repository/handleSpecialization/studentHasSpecialization/getStudentHasSpecialization.js';

const cancellationVerification = async (req, res, next) => {
  const { userID } = req.body;
  const getStudentHasSpecializationInstance = new GetStudentHasSpecialization();

  try {
    // Obtener todos los registros de studentHasSpecialization para el usuario dado
    const data = await getStudentHasSpecializationInstance.getStudentHasSpecialization(userID);

    // Verificar si no hay registros
    if (!(data && data.result && data.result.length > 0)) {
      // Si no hay registros, se puede crear uno nuevo
      next();
      return;
    }

    // Verificar si todos los registros tienen semesterStatusID igual a 4 (cancelado)
    const allCancelled = data.result.every((record) => record.semesterStatusID == 4);
    if (!allCancelled) {
      // Si al menos un registro no está cancelado, no crear uno nuevo
      res.status(200).json({ message: 'No se puede crear uno nuevo.' });
      return;
    }

    // Si todos los registros están cancelados, crear uno nuevo
    next();
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

export default cancellationVerification;
