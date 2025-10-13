import { UpdateTemplateHasQuestion } from '../../../../../../repository/handleRubric/templateHasQuestion/updateTemplateHasQuestion.js';

const updateTemplateHasQuestion = async (req, res) => {
  const {
    templateHasQuestionArray,
  } = req.body;
  const updateTemplateHasQuestionInstance = new UpdateTemplateHasQuestion();
  try {
    const updatePromises = templateHasQuestionArray.map(async (dataArray) => {
      await updateTemplateHasQuestionInstance.updateTemplateHasQuestion(dataArray);
    });
    await Promise.all(updatePromises);
    res.status(200).json({ verificationMessage: 'Se actualizo exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};
export default updateTemplateHasQuestion;
