import { UpdateRubricHasSection } from '../../../../../../repository/handleRubric/rubricHasSection/updateRubricHasSection.js';

const updateRubricHasSection = async (req, res) => {
  const {
    rubricHasSectionArray, rubricID,
  } = req.body;
  const updateRubricHasSectionInstance = new UpdateRubricHasSection();
  try {
    const updatePromises = rubricHasSectionArray.map(async (dataArray) => {
      await updateRubricHasSectionInstance.updateRubricHasSection(dataArray, rubricID);
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
export default updateRubricHasSection;
