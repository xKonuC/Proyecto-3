import { QuestionActivator } from '../../../../../../repository/handleRubric/question/questionActivator.js';

const enableQuestion = async (req, res) => {
  const { questionIDs } = req.body;
  const enableQuestionInstance = new QuestionActivator();
  try {
    await enableQuestionInstance.questionActivator(questionIDs, 1);
    res.status(200).json({ verificationMessage: 'Se Habilitaron las Preguntas Exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default enableQuestion;
