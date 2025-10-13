import { GetStudentHasSemester } from '../../../../../../repository/handleSpecialization/studentHasSemester/getStudentHasSemester.js';
import { GetSpecializationID } from '../../../../../../repository/handleSpecialization/studentHasSpecialization/getSpecializationID.js';

const listStudentHasSemester = async (req, res) => {
  const { userID } = req.body;
  const getStudentHasSemester = new GetStudentHasSemester();
  const getSpecializationIDInstance = new GetSpecializationID();
  try {
    // Obtener la lista de electivas del estudiante
    const data = await getStudentHasSemester.getStudentHasSemester(userID);
    // Obtener el ID de especialización del estudiante
    const specializationID = await getSpecializationIDInstance.getSpecializationID(userID);

    // Devolver ambos, datos de electivas y specializationID en la respuesta
    res.status(200).json({
      studentHasSemesterData: data.result, // Asumiendo que la respuesta es un objeto con una propiedad result
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
export default listStudentHasSemester;
