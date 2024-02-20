const { check } = require('express-validator')
const { validateResults } = require('./../helpers/handleValidator')

const validateCicle = [
  check('ciclo')
    .exists()
    .notEmpty(),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validateCicle }
