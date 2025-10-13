import { body, validationResult } from 'express-validator';

const validateCity = [
  body('city').isString().withMessage('El valor no es un string'),
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

export default validateCity;
