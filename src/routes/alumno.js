const { Router } = require('express')
const { getAllStudents, registerStudent } = require('../controllers/alumno')
const { validateCreateStudent } = require('../validators/alumno')

const router = Router()

router.get('/', getAllStudents)

router.post('/', validateCreateStudent, registerStudent)

module.exports = router
