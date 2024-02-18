const { check } = require('express-validator')
const { validateResults } = require('../helpers/handleValidator')

const validateCreateTeacher = [
  check('nombres')
    .exists()
    .notEmpty(),
  check('apellidos')
    .exists()
    .notEmpty(),
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
  check('estado')
    .isIn(['activo', 'inactivo']),
  (req, res, next) => validateResults(req, res, next)
]

const validateUpdateStatusTeacher = [
  check('idProfesor')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('idAutorizante')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('estado')
    .isIn(['activo', 'inactivo']),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validateCreateTeacher, validateUpdateStatusTeacher }
