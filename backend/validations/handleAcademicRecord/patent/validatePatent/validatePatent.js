import { body, validationResult } from 'express-validator';

const validatePatent = [
  body('inventors').optional({ nullable: true }).isString().withMessage('El inventors no es válido'),
  body('patentName').optional({ nullable: true }).isString().withMessage('El patentName no es válido'),
  body('applicationDate').optional({ nullable: true }).isISO8601()
    .withMessage('La fecha de Aplicación debe estar en un formato ISO 8601 válido (ejemplo: 2023-11-21T03:00:00.000Z)'),
  body('publicationDate').optional({ nullable: true }).isISO8601()
    .withMessage('La fecha de Publicación debe estar en un formato ISO 8601 válido (ejemplo: 2023-11-21T03:00:00.000Z)'),
  body('registrationNumber').optional({ nullable: true }).isString().withMessage('El registrationNumber no es válido'),
  body('status').optional({ nullable: true }).isString().withMessage('El status no es válido'),
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

export default validatePatent;
