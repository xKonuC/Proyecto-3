import { SectionActivator } from '../../../../../../repository/handleRubric/section/sectionActivator.js';

const enableSection = async (req, res) => {
  const { sectionIDs } = req.body;
  const enableSectionInstance = new SectionActivator();
  try {
    await enableSectionInstance.sectionActivator(sectionIDs, 1);
    res.status(200).json({ verificationMessage: 'Se Habilitaron las Preguntas Exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default enableSection;
