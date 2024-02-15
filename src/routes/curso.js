const { Router } = require('express')
const { createCourse, getAllCourses } = require('./../controllers/curso')
const { validateCreateCourse } = require('./../validators/curso')

const router = Router()

router.post('/', validateCreateCourse, createCourse)

router.get('/', getAllCourses)

module.exports = router
