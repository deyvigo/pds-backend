const { Router } = require('express')
const {
  createHorario,
  changeStatus,
  getAllHorarioByTeacher,
  getAlumnsByHorario,
  getHorarioForMatricula,
  getAllHorarioWithCourses
} = require('../controllers/horario')
const { validateCreateHorario, validateChangeStatus, validateIdTeacher, validateIdHorario } = require('./../validators/horario')
const { adminSession, alumnSession } = require('../middlewares/sessionValidator')

const router = Router()

router.post('/', validateCreateHorario, createHorario)

router.get('/', adminSession, getAllHorarioWithCourses)

router.put('/', validateChangeStatus, changeStatus)

router.get('/profesor', validateIdTeacher, getAllHorarioByTeacher)

router.get('/alumno', validateIdHorario, getAlumnsByHorario) // revisar después de matricular alumnos

router.get('/nivel/:nivel/:idAlumno', alumnSession, getHorarioForMatricula)

module.exports = router
