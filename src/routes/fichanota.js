const { Router } = require('express')
const { registerNotes, getStatsByAlumn } = require('./../controllers/fichanota')
const { validateFileNotes } = require('./../validators/fichanota')
const { alumnSession } = require('./../middlewares/sessionValidator')

const router = Router()

router.post('/', validateFileNotes, registerNotes)

router.get('/alumno/:idAlumno', alumnSession, getStatsByAlumn) // envía las notas de los cursos terminados según el alumno que lo pide

module.exports = router