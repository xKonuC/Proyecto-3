import { DeleteTemplateHasQuestion } from '../../../../../../repository/handleRubric/templateHasQuestion/deleteTemplateHasQuestion.js';

const deleteTemplateHasQuestion = async (req, res) => {
  const { templateHasQuestionIDs } = req.body;
  const deleteTemplateHasQuestionInstance = new DeleteTemplateHasQuestion();
  try {
    await deleteTemplateHasQuestionInstance.deleteTemplateHasQuestion(templateHasQuestionIDs);
    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteTemplateHasQuestion;
