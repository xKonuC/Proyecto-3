import { CreateSection } from '../../../../../../repository/handleRubric/section/createSection.js';

const createSection = async (req, res) => {
  const { name } = req.body;
  const createSectionInstance = new CreateSection();
  try {
    await createSectionInstance.createSection(name);
    res.status(200).json({ verificationMessage: 'Se ha creado exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createSection;
