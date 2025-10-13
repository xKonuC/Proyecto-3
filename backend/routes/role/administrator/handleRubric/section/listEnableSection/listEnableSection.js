import { SelectEnableSection } from '../../../../../../repository/handleRubric/section/selectEnableSection.js';

const listEnableSection = async (req, res) => {
  const selectEnableSectionInstance = new SelectEnableSection();
  try {
    const data = await selectEnableSectionInstance.selectEnableSection();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listEnableSection;
