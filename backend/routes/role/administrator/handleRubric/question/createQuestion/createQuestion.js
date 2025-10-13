import { CreateQuestion } from '../../../../../../repository/handleRubric/question/createQuestion.js';

const createQuestion = async (req, res) => {
  const {
    question,
  } = req.body;
  const createQuestionInstance = new CreateQuestion();
  try {
    await createQuestionInstance.createQuestion(question);
    res.status(200).json({ verificationMessage: 'La Pregunta fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createQuestion;
