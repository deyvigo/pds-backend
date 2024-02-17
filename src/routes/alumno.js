const { Router } = require('express')
const { getAllStudents, registerStudent, changeNivel } = require('../controllers/alumno')
const { validateCreateStudent, validateChangeNivel } = require('../validators/alumno')

const router = Router()

router.get('/', getAllStudents)

router.post('/', validateCreateStudent, registerStudent)

router.put('/', validateChangeNivel, changeNivel)

module.exports = router
