const { check } = require('express-validator')
const { validateResults } = require('./../helpers/handleValidator')

const asistArray = ['P', 'T', 'J', 'F']

const validateAsist = [
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
  check('data.*.asistencia')
    .isIn(asistArray),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validateAsist }
