import { body, validationResult } from 'express-validator';

const validateComments = [
  body('comment1').optional({ nullable: true }).isString().withMessage('El comment1 no es válido'),
  body('comment2').optional({ nullable: true }).isString().withMessage('El comment2 no es válido'),
  body('comment3').optional({ nullable: true }).isString().withMessage('El comment3 no es válido'),
  body('comment4').optional({ nullable: true }).isString().withMessage('El comment4 no es válido'),
  body('comment5').optional({ nullable: true }).isString().withMessage('El comment5 no es válido'),
  body('comment6').optional({ nullable: true }).isString().withMessage('El comment6 no es válido'),
  body('comment7').optional({ nullable: true }).isString().withMessage('El comment7 no es válido'),
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

export default validateComments;
