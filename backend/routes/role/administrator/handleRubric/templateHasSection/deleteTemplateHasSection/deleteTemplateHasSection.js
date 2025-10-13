import { DeleteTemplateHasSection } from '../../../../../../repository/handleRubric/templateHasSection/deleteTemplateHasSection.js';

const deleteTemplateHasSection = async (req, res) => {
  const { templateHasSectionIDs, templateID } = req.body;
  const deleteTemplateHasSectionInstance = new DeleteTemplateHasSection();
  try {
    await deleteTemplateHasSectionInstance.deleteTemplateHasSection(templateHasSectionIDs, templateID);
    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteTemplateHasSection;
