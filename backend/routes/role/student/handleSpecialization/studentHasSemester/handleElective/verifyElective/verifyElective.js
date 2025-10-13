import { VerifyElective } from '../../../../../../../repository/handleSpecialization/elective/verifyElective.js';

const verifyElective = async (req, res, next) => {
  const { specializationID, electiveID, number } = req.body;
  const verifyElectiveInstance = new VerifyElective();
  try {
    // Verificar si el electivo está aprobado para la especialización y el número proporcionados
    const data = await verifyElectiveInstance.verifyElective(specializationID, electiveID, number);

    // Si no se encuentra el electivo, devolver un error
    if (!data) {
      return res.status(409).json({ error: 'El electivo aún no ha sido aprobado para esta especialización y número.' });
    }

    // Si el electivo está aprobado, continuar con el siguiente middleware
    next();
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default verifyElective;
