/* eslint-disable no-restricted-syntax */
import { body, validationResult } from 'express-validator';

const validateRubricHasSectionArray = [
  body('rubricHasSectionArray')
    .isArray().withMessage('El arreglo no es válido')
    .custom((value) => {
      if (!Array.isArray(value) || value.length >= process.env.MAX_LENGTH_ARRAY_DATA) {
        throw new Error(`El arreglo debe contener elementos y no puede tener más de ${process.env.MAX_LENGTH_ARRAY_DATA} elementos`);
      }
      for (const item of value) {
        if (
          typeof item.rubricHasSectionID !== 'number'
          || typeof item.sectionID !== 'number'
          || typeof item.positionNumber !== 'number'
        ) {
          throw new Error('Cada elemento del arreglo debe tener las propiedades sectionID, rubricHasSectionID y positionNumber como enteros');
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

export default validateRubricHasSectionArray;
