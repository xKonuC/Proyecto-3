import { body, validationResult } from 'express-validator';

const validDepartmentName = ['educación y humanidad', 'ingeniería', 'ciencias', 'medicina'];

const validateDepartmentName = [
  body('departmentName')
    .isString()
    .withMessage('El valor no es un string')
    .custom((value) => validDepartmentName.includes(value.toLowerCase()))
    .withMessage('El valor del Departamento del Título no es válido'),
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

export default validateDepartmentName;
