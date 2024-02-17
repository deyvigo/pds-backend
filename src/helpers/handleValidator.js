const { validationResult } = require('express-validator')

// Middleware para validar los resultados de las validaciones
const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (e) {
    res.status(403)
    res.send({ errors: e.array() })
  }
}

module.exports = { validateResults }
