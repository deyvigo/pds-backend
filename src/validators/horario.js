const { check } = require('express-validator')
const { validateResults } = require('../helpers/handleValidator')
const DIAS_SEMANA = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
const ESTADO = ['activo', 'inactivo', 'en curso', 'finalizado']

const validateCreateHorario = [
  check('dia')
    .isIn(DIAS_SEMANA),
  check('estado')
    .isIn(ESTADO),
  check('horaInicio')
    .exists()
    .notEmpty()
    .isTime(),
  check('horaFinal')
    .exists()
    .notEmpty()
    .isTime(),
  check('idProfesor')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('idCurso')
    .exists()
    .notEmpty()
    .isNumeric(),
  (req, res, next) => validateResults(req, res, next)
]

const validateChangeStatus = [
  check('idHorario')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('estado')
    .isIn(ESTADO),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validateCreateHorario, validateChangeStatus }
