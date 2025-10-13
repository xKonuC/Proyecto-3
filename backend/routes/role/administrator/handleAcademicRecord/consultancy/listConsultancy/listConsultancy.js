import { GetConsultancy } from '../../../../../../repository/handleAcademicRecord/consultancy/getConsultancy.js';

const listConsultancy = async (req, res) => {
  const { userID } = req.body;
  const getConsultancyInstance = new GetConsultancy();
  try {
    const data = await getConsultancyInstance.getConsultancy(userID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listConsultancy;
