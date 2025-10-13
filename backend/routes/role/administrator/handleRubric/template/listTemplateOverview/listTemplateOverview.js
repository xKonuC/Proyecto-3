import { GetTemplateOverview } from '../../../../../../repository/handleRubric/overview/getTemplateOverview.js';

const listTemplateOverview = async (req, res) => {
  const { templateID } = req.body;
  const getTemplateOverviewInstance = new GetTemplateOverview();
  try {
    const data = await getTemplateOverviewInstance.getTemplateOverview(templateID, 1, 1, 1);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listTemplateOverview;
