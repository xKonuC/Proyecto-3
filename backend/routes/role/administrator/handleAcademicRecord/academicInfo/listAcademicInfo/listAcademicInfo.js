import { GetAcademicInfo } from '../../../../../../repository/handleAcademicRecord/academicInfo/getAcademicInfo.js';

const listAcademicInfo = async (req, res) => {
  const { userID } = req.body;
  const getAcademicInfoInstance = new GetAcademicInfo();
  try {
    const data = await getAcademicInfoInstance.getAcademicInfo(userID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listAcademicInfo;
