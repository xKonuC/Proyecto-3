import { body, validationResult } from 'express-validator';

// Función para formatear la fecha en "DD-MM-YYYY"
const formatDate = (date) => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // Enero es 0!
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

// const validMaritalStatuses = ['soltero/a', 'casado/a', 'divorciado/a', 'viudo/a', 'otro'];
const validGenders = ['m', 'f', 'n', 'o'];

const validateUser = [
  body('rut').isString()
    .withMessage('El RUT no es un string')
    .matches(/^(\d{1,2}\.)?\d{3}\.\d{3}[-][0-9kK]{1}$/)
    .withMessage('Formato de RUT inválido. Ejemplo de formato válido: "123.456.789-K"'),
  body('firstName').notEmpty().withMessage('El firstName no es válido'),
  body('secondName').optional({ nullable: true }).isString().withMessage('El secondName no es válido'),
  body('surname1').notEmpty().withMessage('El surname1 no es válido'),
  body('surname2').optional({ nullable: true }).isString().withMessage('El surname2 no es válido'),
  body('sex').isString()
    .withMessage('El valor no es un string')
    .custom((value) => validGenders.includes(value.toLowerCase()))
    .withMessage('El valor del sexo no es válido'),
  body('birthday').isISO8601() // Verifica si la fecha está en formato "DD-MM-YYYY"
    .withMessage(`La fecha debe estar en formato "YYYY-MM-DD" (ejemplo: "${formatDate(new Date())}")`),
  body('email').isEmail().withMessage('El email no es válido'),
  body('personalEmail').optional({ nullable: true }).isString().withMessage('El personalEmail no es válido'),
  body('phone').isString().withMessage('El phone no es válido'),
  body('entry').optional({ nullable: true }).isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('El entry no es válido'),
  body('group').optional({ nullable: true }).isInt().withMessage('El group no es válido'),
  body('workPlace').optional({ nullable: true }).isString().withMessage('El workPlace no es válido'),
  body('phoneWork').optional({ nullable: true }).isString().withMessage('El phoneWork no es válido'),
  body('job').optional({ nullable: true }).isString().withMessage('El job no es válido'),
  body('articulation').optional({ nullable: true }).isBoolean().withMessage('El articulation no es válido'),
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

export default validateUser;
