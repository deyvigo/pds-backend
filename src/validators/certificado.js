const { check } = require('express-validator')
const { validateResults } = require('./../helpers/handleValidator')

const validateCertificateData = [
  check('nombres')
    .exists()
    .notEmpty(),
  check('id')
    .exists()
    .notEmpty()
    .isNumeric(),
  check('fechaInicio')
    .exists()
    .notEmpty()
    .isISO8601(),
  check('fechaFinal')
    .exists()
    .notEmpty()
    .isISO8601(),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validateCertificateData }
