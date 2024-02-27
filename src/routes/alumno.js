const { Router } = require('express')
const { getAllStudents, registerStudent, getAlumnsForNotes } = require('../controllers/alumno')
const { validateCreateStudent } = require('../validators/alumno')

const router = Router()

router.get('/', getAllStudents)

router.post('/', validateCreateStudent, registerStudent)

// router.put('/', validateChangeNivel, changeNivel)

router.get('/curso/:idCurso/:idProfesor', getAlumnsForNotes)

module.exports = router
