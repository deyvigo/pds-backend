const { check } = require('express-validator')
const { validateResults } = require('../helpers/handleValidator')

const validateLoginCredentials = [
  check('username')
    .exists()
    .notEmpty(),
  check('password')
    .exists()
    .notEmpty(),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validateLoginCredentials }
