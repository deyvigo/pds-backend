const { Router } = require('express')
const { createOneTheme } = require('./../controllers/tema')
const { validateCreateTheme } = require('../validators/tema')

const router = Router()

router.post('/', validateCreateTheme, createOneTheme)

module.exports = router
