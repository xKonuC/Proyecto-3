import { SelectTemplateByID } from '../../../../../../repository/handleRubric/overview/selectTemplateByID.js';
import { CreateRubricHasSection } from '../../../../../../repository/handleRubric/rubricHasSection/createRubricHasSection.js';
import { CreateRubricHasQuestion } from '../../../../../../repository/handleRubric/rubricHasQuestion/createRubricHasQuestion.js';
import { CreateEvaluatorAnswer } from '../../../../../../repository/handleRubric/evaluatorAnswer/createEvaluatorAnswer.js';
import { CreateStageAnswer } from '../../../../../../repository/handleRubric/stageAnswer/createEvaluatorAnswer.js';

const buildRubric = async (req, res) => {
  const {
    rubricID, templateID, evaluationTypeID, evaluator1ID, evaluator2ID, evaluator3ID, evaluator4ID,
  } = req.body;
  const selectTemplateByIDInstance = new SelectTemplateByID();
  const createRubricHasSectionInstance = new CreateRubricHasSection();
  const createRubricHasQuestionInstance = new CreateRubricHasQuestion();

  try {
    let createAnswerInstance;
    if (evaluationTypeID == 1) {
      createAnswerInstance = new CreateEvaluatorAnswer();
    } else {
      createAnswerInstance = new CreateStageAnswer();
    }
    const { sections } = await selectTemplateByIDInstance.selectTemplateByID(templateID, 1, 1);
    // Crear las rubricHasSection y sus rubricHasQuestion asociadas
    const createSectionPromises = sections.map(async (section, index) => {
      const { sectionID, questions } = section;
      const insertId = await createRubricHasSectionInstance.createRubricHasSection(rubricID, { sectionID, positionNumber: index + 1 });

      const createQuestionPromises = questions.map(async (question, questionIndex) => {
        const questionId = await createRubricHasQuestionInstance.createRubricHasQuestion({ questionID: question.questionID, rubricHasSectionID: insertId, positionNumber: questionIndex + 1 });

        if (evaluationTypeID == 1) {
          await createAnswerInstance.createAnswer(evaluator1ID, questionId, 4);
          await createAnswerInstance.createAnswer(evaluator2ID, questionId, 4);
        } else {
          await createAnswerInstance.createAnswer(evaluator1ID, questionId, 1);
          await createAnswerInstance.createAnswer(evaluator2ID, questionId, 1);
          await createAnswerInstance.createAnswer(evaluator3ID, questionId, 1);
          // El codirector es opcional
          if (evaluator4ID !== null) {
            await createAnswerInstance.createAnswer(evaluator4ID, questionId, 1);
          }
        }
      });

      // Esperar a que se completen todas las creaciones de preguntas para esta sección
      await Promise.all(createQuestionPromises);
    });

    // Esperar a que se completen todas las creaciones de secciones
    await Promise.all(createSectionPromises);

    res.status(200).json({ verificationMessage: 'La información de la rubrica fue subida exitosamente' });
  } catch (error) {
    if (error.status === 409) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ error });
    }
  }
};

export default buildRubric;
