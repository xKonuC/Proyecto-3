import { body, validationResult } from 'express-validator';

const validateUrl = [
  body('archiveURL')
    .isURL({ protocols: ['http', 'https'], require_tld: true, require_protocol: true })
    .withMessage('La URL no es válida'),
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

export default validateUrl;
