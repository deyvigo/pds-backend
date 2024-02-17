const { check } = require('express-validator')
const { validateResults } = require('../helpers/handleValidator')

const validateCreateTheme = [
  check('idCurso')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('nombre')
    .exists()
    .notEmpty(),
  check('descripcion')
    .exists()
    .notEmpty(),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validateCreateTheme }
