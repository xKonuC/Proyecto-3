import { body, validationResult } from 'express-validator';

const validateEvaluators = [
  body('evaluator1ID').isInt().withMessage('El evaluator1ID no es válido'),
  body('evaluator2ID').isInt().withMessage('El evaluator2ID no es válido'),
  body('evaluator3ID')
    .custom((value) => {
      if (value !== undefined && value !== null && typeof value !== 'number') {
        throw new Error('El campo debe ser una cadena vacía o un valor válido');
      }
      return true;
    })
    .withMessage('El campo debe ser una cadena vacía o un valor válido'),
  body('evaluator4ID')
    .custom((value) => {
      if (value !== undefined && value !== null && typeof value !== 'number') {
        throw new Error('El campo debe ser una cadena vacía o un valor válido');
      }
      return true;
    })
    .withMessage('El campo debe ser una cadena vacía o un valor válido'),
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

export default validateEvaluators;
