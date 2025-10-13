import { SelectTitleHasUniversity } from '../../../../../../repository/handleTitle/title/selectTitleHasUniversity.js';

const listTitleHasUniversity = async (req, res) => {
  const selectTitleHasUniversityInstance = new SelectTitleHasUniversity();
  try {
    const data = await selectTitleHasUniversityInstance.selectTitleHasUniversity();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listTitleHasUniversity;
