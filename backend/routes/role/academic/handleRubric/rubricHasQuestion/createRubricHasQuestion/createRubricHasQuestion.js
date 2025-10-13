import { CreateRubricHasQuestion } from '../../../../../../repository/handleRubric/rubricHasQuestion/createRubricHasQuestion.js';

const createRubricHasQuestion = async (req, res) => {
  const {
    dataArray,
  } = req.body;
  const createRubricHasQuestionInstance = new CreateRubricHasQuestion();
  try {
    const createPromises = dataArray.map(async (data) => {
      await createRubricHasQuestionInstance.createRubricHasQuestion(data);
    });
    await Promise.all(createPromises);
    res.status(200).json({ verificationMessage: 'La información de la rubrica fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createRubricHasQuestion;
