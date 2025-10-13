import { TemplateActivator } from '../../../../../../repository/handleRubric/template/templateActivator.js';

const enableTemplate = async (req, res) => {
  const { templateIDs } = req.body;
  const enableTemplateInstance = new TemplateActivator();
  try {
    await enableTemplateInstance.templateActivator(templateIDs, 1);
    res.status(200).json({ verificationMessage: 'Se Habilitaron las Preguntas Exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default enableTemplate;
