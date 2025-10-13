import { body, validationResult } from 'express-validator';

const validateTitleYear = [
  body('titleYear').isInt().withMessage('El valor de titleYear no es válido'),
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

export default validateTitleYear;
