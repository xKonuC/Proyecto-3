import { DeleteRubricHasSection } from '../../../../../../repository/handleRubric/rubricHasSection/deleteRubricHasSection2.js';

const deleteRubricHasSection = async (req, res, next) => {
  const { rubricID } = req.body;
  const deleteRubricHasSectionInstance = new DeleteRubricHasSection();
  try {
    /*
      Antes de construir la rubrica, debo de eliminar todas sus relaciones por efecto cascada,
      con este elimino rubricHasSection -> rubricHasQuestion -> evaluatorAnswer o stageAnswer
    */
    await deleteRubricHasSectionInstance.deleteRubricHasSection(rubricID);
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteRubricHasSection;
