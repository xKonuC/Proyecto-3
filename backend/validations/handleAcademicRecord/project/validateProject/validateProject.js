import { body, validationResult } from 'express-validator';

const validateProject = [
  body('title').optional({ nullable: true }).isString().withMessage('El leadAuthor no es válido'),
  body('type').optional({ nullable: true }).isString().withMessage('El type no es válido'),
  body('fundingSource').optional({ nullable: true }).isString().withMessage('El fundingSource no es válido'),
  body('grantYear').optional({ nullable: true })
    .isNumeric()
    .withMessage('El año debe ser un número')
    .toInt()
    .isInt({ min: 2000, max: 3000 })
    .withMessage('El año ingresado no es valido'),
  body('executionPeriod').optional({ nullable: true }).isString().withMessage('El executionPeriod no es válido'),
  body('role').optional({ nullable: true }).isString().withMessage('El role no es válido'),
  body('accessURL').optional({ nullable: true }).isString().withMessage('El accessURL no es válido'),
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

export default validateProject;
