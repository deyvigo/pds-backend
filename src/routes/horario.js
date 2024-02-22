const { Router } = require('express')
const {
  createHorario,
  changeStatus,
  getAllHorarioByTeacher,
  getAlumnsByHorario,
  getHorarioForMatricula,
  getAllHorarioWithCourses
} = require('../controllers/horario')
const { validateCreateHorario, validateChangeStatus, validateIdTeacher, validateIdHorario, validateNivel } = require('./../validators/horario')
const { adminSession } = require('../middlewares/sessionValidator')

const router = Router()

router.post('/', validateCreateHorario, createHorario)

router.get('/', adminSession, getAllHorarioWithCourses)

router.put('/', validateChangeStatus, changeStatus)

router.get('/profesor', validateIdTeacher, getAllHorarioByTeacher)

router.get('/alumno', validateIdHorario, getAlumnsByHorario) // revisar después de matricular alumnos

router.get('/nivel', validateNivel, getHorarioForMatricula)

module.exports = router
