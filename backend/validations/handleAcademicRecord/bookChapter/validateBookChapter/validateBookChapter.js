import { body, validationResult } from 'express-validator';

const validateBookChapter = [
  body('authors').optional({ nullable: true }).isString().withMessage('El authors no es válido'),
  body('leadAuthor').optional({ nullable: true }).isString().withMessage('El leadAuthor no es válido'),
  body('year').optional({ nullable: true })
    .isNumeric()
    .withMessage('El año debe ser un número')
    .toInt()
    .isInt({ min: 2000, max: 3000 })
    .withMessage('El año ingresado no es valido'),
  body('type').optional({ nullable: true }).isString().withMessage('El type no es válido'),
  body('bookName').optional({ nullable: true }).isString().withMessage('El bookName no es válido'),
  body('chapterName').optional({ nullable: true }).isString().withMessage('El chapterName no es válido'),
  body('place').optional({ nullable: true }).isString().withMessage('El place no es válido'),
  body('editorial').optional({ nullable: true }).isString().withMessage('El editorial no es válido'),
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

export default validateBookChapter;
