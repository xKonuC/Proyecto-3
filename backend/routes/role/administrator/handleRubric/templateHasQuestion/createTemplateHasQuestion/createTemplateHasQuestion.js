import { CreateTemplateHasQuestion } from '../../../../../../repository/handleRubric/templateHasQuestion/createTemplateHasQuestion.js';

const createTemplateHasQuestion = async (req, res) => {
  const {
    dataArray,
  } = req.body;
  const createTemplateHasQuestionInstance = new CreateTemplateHasQuestion();
  try {
    const createPromises = dataArray.map(async (data) => {
      await createTemplateHasQuestionInstance.createTemplateHasQuestion(data);
    });
    await Promise.all(createPromises);
    res.status(200).json({ verificationMessage: 'La información de la Plantilla fue subido exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default createTemplateHasQuestion;
