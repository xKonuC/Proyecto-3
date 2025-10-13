import { DeleteRubricHasQuestion } from '../../../../../../repository/handleRubric/rubricHasQuestion/deleteRubricHasQuestion.js';

const deleteRubricHasQuestion = async (req, res) => {
  const { rubricHasQuestionIDs } = req.body;
  const deleteRubricHasQuestionInstance = new DeleteRubricHasQuestion();
  try {
    await deleteRubricHasQuestionInstance.deleteRubricHasQuestion(rubricHasQuestionIDs);
    res.status(200).json({ verificationMessage: 'Se eliminó exitosamente' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export default deleteRubricHasQuestion;
