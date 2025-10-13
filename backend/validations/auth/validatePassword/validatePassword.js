import { body, validationResult } from 'express-validator';

const validatePassword = [
  body('password')
    .isString()
    .withMessage('La contraseña no es un string')
    .isLength({ min: 8 }) // Mínimo 8 caracteres
    .withMessage('La contraseña debe tener al menos 8 caracteres')
    .matches(/[a-z]/) // Debe contener al menos una letra minúscula
    .withMessage('La contraseña debe contener al menos una letra minúscula')
    .matches(/[A-Z]/) // Debe contener al menos una letra mayúscula
    .withMessage('La contraseña debe contener al menos una letra mayúscula')
    .matches(/[0-9]/) // Debe contener al menos un número
    .withMessage('La contraseña debe contener al menos un número')
    .matches(/[!@#$%^&*(),.?":{}|<>_]/) // Debe contener al menos un carácter especial
    .withMessage('La contraseña debe contener al menos un carácter especial: !@#$%^&*(),.?":{}|<>'),
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

export default validatePassword;
