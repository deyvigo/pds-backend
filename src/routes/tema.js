const { Router } = require('express')
const { createOneTheme, getAllThemesWithCourse } = require('./../controllers/tema')
const { validateCreateTheme } = require('../validators/tema')
const { adminSession } = require('./../middlewares/sessionValidator')

const router = Router()

router.post('/', validateCreateTheme, createOneTheme)

router.get('/', adminSession, getAllThemesWithCourse)

module.exports = router
