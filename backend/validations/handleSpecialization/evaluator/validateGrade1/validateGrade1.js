import { body, validationResult } from 'express-validator';

const validateGrade1 = [
  body('grade1')
    .optional({ nullable: true })
    .isFloat({ min: 1.0, max: 7.0 })
    .withMessage('El grade1 debe ser un número entre 1.0 y 7.0'),
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

export default validateGrade1;
