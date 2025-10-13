import { UpdateAcademicInfo } from '../../../../../../repository/handleAcademicRecord/academicInfo/updateAcademicInfo.js';

const updateAcademicInfo = async (req, res) => {
  const {
    userID, bondType, investigationLines, bestDegreeID, workedHours, hierarchy,
  } = req.body;
  const updateAcademicInfoInstance = new UpdateAcademicInfo();
  try {
    await updateAcademicInfoInstance.updateAcademicInfo(userID, bondType, investigationLines, bestDegreeID, workedHours, hierarchy);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateAcademicInfo;
