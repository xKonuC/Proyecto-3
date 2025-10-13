import { QuestionActivator } from '../../../../../../repository/handleRubric/question/questionActivator.js';

const disableQuestion = async (req, res) => {
  const { questionIDs } = req.body;
  const disableQuestionInstance = new QuestionActivator();
  try {
    await disableQuestionInstance.questionActivator(questionIDs, 0);
    res.status(200).json({ verificationMessage: 'Se Deshabilitado las Preguntas Exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default disableQuestion;
