import { SelectSection } from '../../../../../../repository/handleRubric/section/selectSection.js';

const listSection = async (req, res) => {
  const selectSectionInstance = new SelectSection();
  try {
    const data = await selectSectionInstance.selectSection();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listSection;
