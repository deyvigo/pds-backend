const { Router } = require('express')
const { createCourse, getAllCoursesWithAdmin, getAllCoursesForTeacher } = require('./../controllers/curso')
const { validateCreateCourse } = require('./../validators/curso')
const { adminSession } = require('./../middlewares/sessionValidator')

const router = Router()

router.post('/', adminSession, validateCreateCourse, createCourse)

router.get('/', adminSession, getAllCoursesWithAdmin)

router.get('/:idProfesor', getAllCoursesForTeacher)

module.exports = router
