import { SectionActivator } from '../../../../../../repository/handleRubric/section/sectionActivator.js';

const disableSection = async (req, res) => {
  const { sectionIDs } = req.body;
  const disableSectionInstance = new SectionActivator();
  try {
    await disableSectionInstance.sectionActivator(sectionIDs, 0);
    res.status(200).json({ verificationMessage: 'Se Deshabilitado las Preguntas Exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default disableSection;
