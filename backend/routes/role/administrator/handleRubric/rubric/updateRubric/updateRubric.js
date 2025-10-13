import { UpdateRubric } from '../../../../../../repository/handleRubric/rubric/updateRubric.js';

const updateRubric = async (req, res, next) => {
  const {
    rubricID, name, description, templateID, isUpdateTemplateID,
  } = req.body;
  const updateRubricInstance = new UpdateRubric();
  try {
    await updateRubricInstance.updateRubric(rubricID, name, description, templateID);
    // Si no se actualizo la plantilla solo devolverá un mensaje de verificación
    if (!isUpdateTemplateID) {
      res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
    }
    // Si se actualizo la plantilla debo volver a construir el rubricHasSection y rubricHasQuestion asociados esa rubrica con la nueva Plantilla
    next();
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateRubric;
