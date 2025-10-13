import { body, validationResult } from 'express-validator';

const validCategory = ['currículum', 'fotografía', 'carta de motivación', 'certificado de nacimiento', 'fotocopia de cédula de identidad'];

const validateCategory = [
  body('category')
    .isString()
    .withMessage('El valor no es un string')
    .custom((value) => validCategory.includes(value.toLowerCase()))
    .withMessage('El valor de la categoria no es válido'),
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

export default validateCategory;
