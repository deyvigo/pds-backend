const { check } = require('express-validator')
const { validateResults } = require('./../helpers/handleValidator')

const validateCreateCourse = [
  check('codigo')
    .exists()
    .notEmpty(),
  check('nombre')
    .exists()
    .notEmpty(),
  check('nivel')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('requisito')
    .optional({ nullable: true })
    .isNumeric(),
  check('idCreador')
    .exists()
    .notEmpty()
    .isNumeric(),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validateCreateCourse }
