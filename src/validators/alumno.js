const { check } = require('express-validator')
const { validateResults } = require('../helpers/handleValidator')

const validateCreateStudent = [
  check('nombres')
    .exists()
    .notEmpty(),
  check('apellidos')
    .exists()
    .notEmpty(),
  check('nivel')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('username')
    .exists()
    .notEmpty(),
  check('password')
    .exists()
    .notEmpty(),
  check('rol')
    .exists()
    .isNumeric()
    .notEmpty(),
  (req, res, next) => validateResults(req, res, next)
]

const validateChangeNivel = [
  check('nivel')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('username')
    .exists()
    .notEmpty(),
  (req, res, next) => validateResults(req, res, next)
]

const validateIdAlumno = [
  check('idAlumno')
    .exists()
    .notEmpty()
    .isNumeric(),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validateCreateStudent, validateChangeNivel, validateIdAlumno }
