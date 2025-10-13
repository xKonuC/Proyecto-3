import { SelectEnableTemplate } from '../../../../../../repository/handleRubric/template/selectEnableTemplate.js';

const listEnableTemplate = async (req, res) => {
  const selectEnableTemplateInstance = new SelectEnableTemplate();
  try {
    const data = await selectEnableTemplateInstance.selectEnableTemplate();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listEnableTemplate;
