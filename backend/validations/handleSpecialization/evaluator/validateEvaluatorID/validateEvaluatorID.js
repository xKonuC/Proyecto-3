import { body, validationResult } from 'express-validator';

const validateEvaluatorID = [
  body('evaluator1ID').isInt().withMessage('El evaluator1ID no es válido'),
  body('evaluator2ID').isInt().withMessage('El evaluator2ID no es válido'),
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

export default validateEvaluatorID;
