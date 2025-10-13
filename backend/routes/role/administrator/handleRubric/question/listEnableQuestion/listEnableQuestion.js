import { SelectEnableQuestion } from '../../../../../../repository/handleRubric/question/selectEnableQuestion.js';

const listEnableQuestion = async (req, res) => {
  const selectEnableQuestionInstance = new SelectEnableQuestion();
  try {
    const data = await selectEnableQuestionInstance.selectEnableQuestion();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default listEnableQuestion;
