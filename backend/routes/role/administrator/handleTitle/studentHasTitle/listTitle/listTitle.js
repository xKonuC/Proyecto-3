import { SelectTitle } from '../../../../../../repository/handleTitle/title/selectTitle.js';

const listTitleHasUniversity = async (req, res) => {
  const selectTitleInstance = new SelectTitle();
  try {
    const data = await selectTitleInstance.selectTitle();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listTitleHasUniversity;
