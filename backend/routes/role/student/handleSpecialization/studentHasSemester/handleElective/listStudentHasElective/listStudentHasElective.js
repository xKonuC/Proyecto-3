import { GetStudentHasElective } from '../../../../../../../repository/handleSpecialization/studentHasSemester/handleElective/getStudentHasElective.js';
import { GetSpecializationID } from '../../../../../../../repository/handleSpecialization/studentHasSpecialization/getSpecializationID.js';

const listStudentHasElective = async (req, res) => {
  const { userID } = req.body;
  const getStudentHasElectiveInstance = new GetStudentHasElective();
  const getSpecializationIDInstance = new GetSpecializationID();
  try {
    // Obtener la lista de electivas del estudiante
    const electiveData = await getStudentHasElectiveInstance.getStudentHasElective(userID);
    // Obtener el ID de especialización del estudiante
    const specializationID = await getSpecializationIDInstance.getSpecializationID(userID);

    // Devolver ambos, datos de electivas y specializationID en la respuesta
    res.status(200).json({
      electiveData: electiveData.result, // Asumiendo que la respuesta es un objeto con una propiedad result
      specializationID,
    });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listStudentHasElective;
