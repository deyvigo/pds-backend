const { check } = require('express-validator')
const { validateResults } = require('./../helpers/handleValidator')

const validateMatricula = [
  check('data')
    .exists()
    .isArray(),
  check('data.*.idAlumno')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('data.*.idHorario')
    .exists()
    .notEmpty()
    .isNumeric(),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validateMatricula }
