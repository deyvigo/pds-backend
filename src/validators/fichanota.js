const { check } = require('express-validator')
const { validateResults } = require('./../helpers/handleValidator')

const validateFileNotes = [
  check('data')
    .exists()
    .isArray(),
  check('data.*.idAlumno')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('data.*.idTema')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('data.*.idProfesor')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('data.*.idCiclo')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('data.*.notaEvaOral')
    .exists()
    .notEmpty()
    .isNumeric()
    .custom(value => value >= 0 && value <= 20),
  check('data.*.notaEvaEscrita')
    .exists()
    .notEmpty()
    .isNumeric()
    .custom(value => value >= 0 && value <= 20),
  check('data.*.puntosTiempo')
    .exists()
    .notEmpty()
    .isNumeric()
    .custom(value => value >= 0 && value <= 5),
  check('data.*.puntosContenido')
    .exists()
    .notEmpty()
    .isNumeric()
    .custom(value => value >= 0 && value <= 5),
  check('data.*.puntosHabComu')
    .exists()
    .notEmpty()
    .isNumeric()
    .custom(value => value >= 0 && value <= 5),
  check('data.*.puntosEstructura')
    .exists()
    .notEmpty()
    .isNumeric()
    .custom(value => value >= 0 && value <= 5),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validateFileNotes }
