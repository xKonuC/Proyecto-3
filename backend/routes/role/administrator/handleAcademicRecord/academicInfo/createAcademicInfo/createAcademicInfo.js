import { CreateAcademicInfo } from '../../../../../../repository/handleAcademicRecord/academicInfo/createAcademicInfo.js';

const createAcademicInfo = async (req, res) => {
  const {
    userID, bondType, investigationLines, bestDegreeID, workedHours, hierarchy,
  } = req.body;
  const createAcademicInfoInstance = new CreateAcademicInfo();
  try {
    await createAcademicInfoInstance.createAcademicInfo(userID, bondType, investigationLines, bestDegreeID, workedHours, hierarchy);
    res.status(200).json({ verificationMessage: 'La Información fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createAcademicInfo;
