const { Router } = require('express')
const { createHorario, getAllHorarioByCourse, changeStatus, getAllHorarioByTeacher, getAlumnsByHorario } = require('../controllers/horario')
const { validateCreateHorario, validateChangeStatus, validateIdCourse, validateIdTeacher, validateIdHorario } = require('./../validators/horario')

const router = Router()

router.post('/', validateCreateHorario, createHorario)

router.get('/', validateIdCourse, getAllHorarioByCourse)

router.put('/', validateChangeStatus, changeStatus)

router.get('/profesor', validateIdTeacher, getAllHorarioByTeacher)

router.get('/alumno', validateIdHorario, getAlumnsByHorario) // revisar después de matricular alumnos

module.exports = router
