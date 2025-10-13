import { SelectQuestion } from '../../../../../../repository/handleRubric/question/selectQuestion.js';

const listQuestion = async (req, res) => {
  const selectQuestionInstance = new SelectQuestion();
  try {
    const data = await selectQuestionInstance.selectQuestion();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listQuestion;
