import { UpdateStudentHasSpecialization } from '../../../../../../repository/handleSpecialization/studentHasSpecialization/updateStudentHasSpecialization.js';
/*
verifyStatus ya no se utiliza, verifico que semesterStatusID sea 1('en proceso') o 5(en evaluación) para verificar
utilizo el result en el campo affectedRows: 1 si es correcto si no es correcto affectedRows: 0

{
  result: ResultSetHeader {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 0  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 0
  }
}

//en este caso semesterStatusID: 1, no es encontrado
{
  result: ResultSetHeader {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    info: 'Rows matched: 0  Changed: 0  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 0
  }
}
*/
const updateStudentHasSpecialization = async (req, res) => {
  const {
    studentHasSpecializationID, semesterID, specializationID, userID,
  } = req.body;
  const updateStudentHasSpecializationInstance = new UpdateStudentHasSpecialization();
  try {
    const data = await updateStudentHasSpecializationInstance.updateStudentHasSpecialization(studentHasSpecializationID, specializationID, semesterID, userID);
    if (data.result.affectedRows > 0) {
      res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
    } else {
      return res.status(409).json({ error: 'No tienes permiso para modificar la especialización' });
    }
  } catch (error) {
    if (error && error.code === '23505') {
      res.status(400).json({ message: 'Ya estás asociado a esta especialización' });
    } else if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateStudentHasSpecialization;
