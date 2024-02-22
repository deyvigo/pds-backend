const { check } = require('express-validator')
const { validateResults } = require('./../helpers/handleValidator')

const validateCicle = [
  check('ciclo')
    .exists()
    .notEmpty(),
  check('inicio')
    .exists()
    .notEmpty()
    .isISO8601(),
  check('fin')
    .exists()
    .notEmpty()
    .isISO8601(),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validateCicle }
