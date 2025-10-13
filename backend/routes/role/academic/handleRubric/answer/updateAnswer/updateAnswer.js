import { UpdateEvaluatorAnswer } from '../../../../../../repository/handleRubric/evaluatorAnswer/updateEvaluatorAnswer.js';
import { UpdateStageAnswer } from '../../../../../../repository/handleRubric/stageAnswer/updateEvaluatorAnswer.js';

const updateAnswer = async (req, res) => {
  const { dataArray, evaluationTypeID } = req.body;

  let updateAnswerInstance;
  try {
    if (evaluationTypeID == 1) {
      updateAnswerInstance = new UpdateEvaluatorAnswer();
    } else {
      updateAnswerInstance = new UpdateStageAnswer();
    }

    const updatePromises = dataArray.map(async (data) => {
      await updateAnswerInstance.updateAnswer(data.answerID, data.answer);
    });

    await Promise.all(updatePromises);
    res.status(200).json({ verificationMessage: 'La información de la rubrica fue actualizado exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error: error.toString() });
    }
  }
};

export default updateAnswer;
