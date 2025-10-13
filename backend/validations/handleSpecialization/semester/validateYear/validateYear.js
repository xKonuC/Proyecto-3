import { body, validationResult } from 'express-validator';

const validateYear = [
  body('year')
    .isNumeric().withMessage('El año debe ser un número')
    .toInt() // Convierte el valor a entero para la validación de rango
    .isInt({ min: 2000, max: 3000 })
    .withMessage('El año ingresado no es valido'),
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

export default validateYear;
