const { Router } = require('express')
const { createOneTheme, getAllByCourse } = require('./../controllers/tema')
const { validateCreateTheme } = require('../validators/tema')
const { validateIdCourse } = require('../validators/horario')

const router = Router()

router.post('/', validateCreateTheme, createOneTheme)

router.get('/', validateIdCourse, getAllByCourse)

module.exports = router
