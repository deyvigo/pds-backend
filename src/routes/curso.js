const { Router } = require('express')
const { createCourse, getAllCoursesWithAdmin } = require('./../controllers/curso')
const { validateCreateCourse } = require('./../validators/curso')
const { adminSession } = require('./../middlewares/sessionValidator')

const router = Router()

router.post('/', adminSession, validateCreateCourse, createCourse)

router.get('/', adminSession, getAllCoursesWithAdmin)

module.exports = router
