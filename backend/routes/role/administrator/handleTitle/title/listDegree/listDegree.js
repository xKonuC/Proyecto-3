import { SelectDegree } from '../../../../../../repository/handleTitle/degree/selectDegree.js';

const listDegree = async (req, res) => {
  const selectDegree = new SelectDegree();
  try {
    const data = await selectDegree.selectDegree();
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listDegree;
