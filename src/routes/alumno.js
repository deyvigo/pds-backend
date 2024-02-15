const { Router } = require('express')
const { getAllStudents, registerStudent } = require('../controllers/alumno')
const { validateCreateStudent } = require('../validators/alumno')
const { teacherSession } = require('./../middlewares/sessionValidator')

const router = Router()

router.get('/', teacherSession, getAllStudents)

router.post('/', validateCreateStudent, registerStudent)

module.exports = router
