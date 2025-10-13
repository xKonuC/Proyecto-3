import { body, validationResult } from 'express-validator';

// Es utilizado para verificar si se cambio de plantilla(no es un dato para la base de datos)
const validateIsUpdateTemplateID = [
  body('isUpdateTemplateID')
    .isBoolean()
    .withMessage('El valor no es un booleano'),
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

export default validateIsUpdateTemplateID;
