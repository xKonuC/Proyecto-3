import { body, validationResult } from 'express-validator';

const validateLoginPassword = [
  body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isString()
    .withMessage('La contraseña debe ser un string'),
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

export default validateLoginPassword;
