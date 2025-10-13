import { body, validationResult } from 'express-validator';

const validateAcademicInfo = [
  body('bondType').isString().withMessage('El bondType no es válido'),
  body('investigationLines').isString().withMessage('El investigationLines no es válido'),
  body('workedHours').isString()
    .withMessage('El workedHours no es válido'),
  body('hierarchy').optional({ nullable: true }).isString().withMessage('El hierarchy no es válido'),
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

export default validateAcademicInfo;
