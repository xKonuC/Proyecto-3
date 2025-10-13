import { UpdateQuestion } from '../../../../../../repository/handleRubric/question/updateQuestion.js';

const updateQuestion = async (req, res) => {
  const {
    questionID, question,
  } = req.body;
  const updateQuestionInstance = new UpdateQuestion();
  try {
    await updateQuestionInstance.updateQuestion(questionID, question);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateQuestion;
