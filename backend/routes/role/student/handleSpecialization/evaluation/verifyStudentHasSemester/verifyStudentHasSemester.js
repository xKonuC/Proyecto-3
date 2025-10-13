import { VerifyStudentHasSemester } from '../../../../../../repository/handleSpecialization/studentHasSemester/verifyStudentHasSemester.js';

const verifyStudentHasSemester = async (req, res, next) => {
  const {
    userID, studentHasSemesterID,
  } = req.body;
  const verifyStudentHasSemesterInstance = new VerifyStudentHasSemester();
  try {
    const data = await verifyStudentHasSemesterInstance.verifyStudentHasSemester(userID, studentHasSemesterID);
    if (data) {
      // estos datos se utilizaran para la ubicación de archivo junto a stage
      req.body.semesterID = data.semesterID;
      req.body.specializationID = data.specializationID;

      // estos datos se utilizaran para verificar
      req.body.evaluationStatusID = data.evaluationStatusID;
      next();
    } else {
      return res.status(409).json({ error: 'No tienes permiso para modificar esta evaluación' });
    }
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default verifyStudentHasSemester;
