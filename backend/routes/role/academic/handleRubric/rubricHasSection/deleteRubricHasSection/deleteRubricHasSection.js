import { DeleteRubricHasSection } from '../../../../../../repository/handleRubric/rubricHasSection/deleteRubricHasSection.js';

const deleteRubricHasSection = async (req, res) => {
  const { rubricHasSectionIDs, rubricID } = req.body;
  const deleteRubricHasSectionInstance = new DeleteRubricHasSection();
  try {
    await deleteRubricHasSectionInstance.deleteRubricHasSection(rubricHasSectionIDs, rubricID);
    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteRubricHasSection;
