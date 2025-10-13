import { body, validationResult } from 'express-validator';

const validatePreprojectEvaluatorID = [
  body('preprojectEvaluatorID').isInt().withMessage('El preprojectEvaluatorID no es válido'),
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

export default validatePreprojectEvaluatorID;
