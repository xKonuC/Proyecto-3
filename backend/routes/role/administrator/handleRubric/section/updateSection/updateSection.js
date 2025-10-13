import { UpdateSection } from '../../../../../../repository/handleRubric/section/updateSection.js';

const updateSection = async (req, res) => {
  const {
    sectionID, name,
  } = req.body;
  const updateSectionInstance = new UpdateSection();
  try {
    await updateSectionInstance.updateSection(sectionID, name);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateSection;
