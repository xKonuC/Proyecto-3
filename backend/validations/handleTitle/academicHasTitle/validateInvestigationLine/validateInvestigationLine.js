import { body, validationResult } from 'express-validator';

const validInvestigationLine = ['educación y humanidad', 'ingeniería', 'ciencias', 'medicina'];

const validateInvestigationLine = [
  body('investigationLine')
    .isString()
    .withMessage('El valor no es un string')
    .custom((value) => validInvestigationLine.includes(value.toLowerCase()))
    .withMessage('La Línea de Investigación no es válido'),
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

export default validateInvestigationLine;
