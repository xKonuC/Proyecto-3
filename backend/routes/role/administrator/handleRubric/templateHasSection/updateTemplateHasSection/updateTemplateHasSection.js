import { UpdateTemplateHasSection } from '../../../../../../repository/handleRubric/templateHasSection/updateTemplateHasSection.js';

const updateTemplateHasSection = async (req, res) => {
  const {
    templateHasSectionArray, templateID,
  } = req.body;
  const updateTemplateHasSectionInstance = new UpdateTemplateHasSection();
  try {
    const updatePromises = templateHasSectionArray.map(async (dataArray) => {
      await updateTemplateHasSectionInstance.updateTemplateHasSection(dataArray, templateID);
    });
    await Promise.all(updatePromises);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateTemplateHasSection;
