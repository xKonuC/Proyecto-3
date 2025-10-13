import { body, validationResult } from 'express-validator';

const validTypeBond = ['claustro/núcleo', 'colaborador'];

const validateTypeBond = [
  body('typeBond')
    .isString()
    .withMessage('El valor no es un string')
    .custom((value) => validTypeBond.includes(value.toLowerCase()))
    .withMessage('El Tipo de Vinculación no es válido'),
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

export default validateTypeBond;
