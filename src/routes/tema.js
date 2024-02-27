const { Router } = require('express')
const { createOneTheme, getAllThemesWithCourse, getAllThemesByCourse } = require('./../controllers/tema')
const { validateCreateTheme } = require('../validators/tema')
const { adminSession, teacherSession } = require('./../middlewares/sessionValidator')

const router = Router()

router.post('/', validateCreateTheme, createOneTheme)

router.get('/', adminSession, getAllThemesWithCourse)

router.get('/curso/:idCurso/:idProfesor', teacherSession, getAllThemesByCourse)

module.exports = router
