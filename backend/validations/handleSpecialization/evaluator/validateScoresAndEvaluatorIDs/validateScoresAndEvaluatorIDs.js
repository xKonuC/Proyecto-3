import { body, validationResult } from 'express-validator';

const validateScoresAndEvaluatorIDs = [
  body('evaluator1ID').isInt().withMessage('El evaluator1ID no es válido'),
  body('evaluator2ID').isInt().withMessage('El evaluator2ID no es válido'),
  body('evaluator3ID').isInt().withMessage('El evaluator3ID no es válido'),
  body('evaluator4ID').optional({ nullable: true }).isInt().withMessage('El evaluator4ID no es válido'),
  body('evaluator5ID').isInt().withMessage('El evaluator5ID no es válido'),
  body('grade1').isFloat({ min: 1.0, max: 7.0 }).withMessage('El grade1 no es válido'),
  body('grade2').isFloat({ min: 1.0, max: 7.0 }).withMessage('El grade2 no es válido'),
  body('grade3').isFloat({ min: 1.0, max: 7.0 }).withMessage('El grade3 no es válido'),
  body('grade4').optional({ nullable: true }).isFloat({ min: 1.0, max: 7.0 }).withMessage('El grade4 no es válido'),
  body('grade5').isFloat({ min: 1.0, max: 7.0 }).withMessage('El grade5 no es válido'),
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

export default validateScoresAndEvaluatorIDs;
