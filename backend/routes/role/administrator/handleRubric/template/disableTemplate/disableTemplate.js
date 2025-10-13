import { TemplateActivator } from '../../../../../../repository/handleRubric/template/templateActivator.js';

const disableTemplate = async (req, res) => {
  const { templateIDs } = req.body;
  const disableTemplateInstance = new TemplateActivator();
  try {
    await disableTemplateInstance.templateActivator(templateIDs, 0);
    res.status(200).json({ verificationMessage: 'Se Deshabilitado las Preguntas Exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default disableTemplate;
