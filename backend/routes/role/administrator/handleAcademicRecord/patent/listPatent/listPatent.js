import { GetPatent } from '../../../../../../repository/handleAcademicRecord/patent/getPatent.js';

const listPatent = async (req, res) => {
  const { userID } = req.body;
  const getPatentInstance = new GetPatent();
  try {
    const data = await getPatentInstance.getPatent(userID);
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listPatent;
