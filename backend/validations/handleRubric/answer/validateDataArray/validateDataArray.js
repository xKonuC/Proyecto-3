/* eslint-disable no-restricted-syntax */
import { body, validationResult } from 'express-validator';

const validateDataArray = [
  body('dataArray')
    .isArray().withMessage('El arreglo no es válido')
    .custom((value) => {
      if (!Array.isArray(value) || value.length >= process.env.MAX_LENGTH_ARRAY_DATA) {
        throw new Error(`El arreglo debe contener elementos y no puede tener más de ${process.env.MAX_LENGTH_ARRAY_DATA} elementos`);
      }
      for (const item of value) {
        if (
          (typeof item.answerID !== 'number' && item.answerID !== null)
          || (typeof item.rubricHasQuestionID !== 'number' && item.rubricHasQuestionID !== null && item.rubricHasQuestionID !== undefined)
          || (typeof item.evaluatorID !== 'number' && item.evaluatorID !== null && item.evaluatorID !== undefined)
          || (typeof item.answer !== 'string' && typeof item.answer !== 'number' && item.answer !== null)
        ) {
          throw new Error('Cada elemento del arreglo debe tener las propiedades stageAnswerID, rubricHasQuestionID, evaluatorID y answer como enteros');
        }
      }

      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    next();
  },
];

export default validateDataArray;
