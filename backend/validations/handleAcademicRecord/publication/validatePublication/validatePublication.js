import { body, validationResult } from 'express-validator';

const validatePublication = [
  body('authors').optional({ nullable: true }).isString().withMessage('El authors no es válido'),
  body('leadAuthor').isString().withMessage('El leadAuthor no es válido'),
  body('year').optional({ nullable: true })
    .isNumeric()
    .withMessage('El año debe ser un número')
    .toInt()
    .isInt({ min: 2000, max: 3000 })
    .withMessage('El año ingresado no es valido'),
  body('type').optional({ nullable: true }).isString().withMessage('El type no es válido'),
  body('isIndexed').optional({ nullable: true }).isInt().withMessage('El isIndexed no es válido'),
  body('title').optional({ nullable: true }).isString().withMessage('El title no es válido'),
  body('journal').optional({ nullable: true }).isString().withMessage('El journal no es válido'),
  body('ISSN').optional({ nullable: true }).isString().withMessage('El ISSN no es válido'),
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

export default validatePublication;
