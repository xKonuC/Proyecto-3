import { body, validationResult } from 'express-validator';

const validateEvaluator_userID = [
  body('evaluator1_userID').isInt().withMessage('El evaluator1_userID no es válido'),
  body('evaluator2_userID').isInt().withMessage('El evaluator2_userID no es válido'),
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

export default validateEvaluator_userID;
