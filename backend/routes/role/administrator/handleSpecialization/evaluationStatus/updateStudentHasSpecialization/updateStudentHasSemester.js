import { ApprovalSpecialization } from '../../../../../../repository/handleSpecialization/studentHasSpecialization/approvalSpecialization.js';

const updateStudentHasSemester = async (req, res) => {
  const {
    studentID, specializationID, semesterID,
  } = req.body;
  const approvalSpecializationInstance = new ApprovalSpecialization();
  try {
    // Aprobé la linea de especialización (semesterStatusID es 2(Aprobado))
    await approvalSpecializationInstance.approvalSpecialization(studentID, specializationID, 2, semesterID);
    // Crear campo en ThesisRepository
    // Enviar Correo de que aprobé la tesis
    res.status(200).json({ verificationMessage: 'Se actualizó exitosamente y aprobaste la tesis' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateStudentHasSemester;
