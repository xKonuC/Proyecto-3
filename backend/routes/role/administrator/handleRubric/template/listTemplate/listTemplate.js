import { SelectTemplate } from '../../../../../../repository/handleRubric/template/selectTemplate.js';

const listTemplate = async (req, res) => {
  const selectTemplateInstance = new SelectTemplate();
  try {
    const data = await selectTemplateInstance.selectTemplate();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listTemplate;
