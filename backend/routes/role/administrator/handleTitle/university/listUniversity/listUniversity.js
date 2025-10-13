import { SelectUniversity } from '../../../../../../repository/handleTitle/university/selectUniversity.js';

const listUniversity = async (req, res) => {
  const selectUniversityInstance = new SelectUniversity();
  try {
    const data = await selectUniversityInstance.selectUniversity();
    res.status(200).json(data);
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default listUniversity;
