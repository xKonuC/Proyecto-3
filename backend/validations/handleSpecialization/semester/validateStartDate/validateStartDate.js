import { body, validationResult } from 'express-validator';

const validateStartDate = [
  body('startDate')
    .isISO8601()
    .withMessage('La fecha debe estar en un formato ISO 8601 válido (ejemplo: 2023-11-21T03:00:00.000Z)'),
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

export default validateStartDate;
