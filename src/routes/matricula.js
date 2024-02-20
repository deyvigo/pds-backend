const { Router } = require('express')
const { createMatricula, getFichaMatriculaByAlumn } = require('./../controllers/matricula')
const { validateMatricula } = require('../validators/matricula')
const { validateIdAlumno } = require('./../validators/alumno')

const router = Router()

router.post('/', validateMatricula, createMatricula)

router.get('/', validateIdAlumno, getFichaMatriculaByAlumn)

module.exports = router
