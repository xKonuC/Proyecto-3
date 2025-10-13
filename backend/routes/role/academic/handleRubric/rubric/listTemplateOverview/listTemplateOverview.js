import { SelectTemplateOverview } from '../../../../../../repository/handleRubric/overview/selectTemplateOverview.js';

const listTemplateOverview = async (req, res) => {
  const selectTemplateOverviewInstance = new SelectTemplateOverview();
  try {
    const data = await selectTemplateOverviewInstance.selectTemplateOverview(1, 1, 1);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listTemplateOverview;
