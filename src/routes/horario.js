const { Router } = require('express')
const {
  createHorario,
  changeStatus,
  getAllHorarioByTeacher,
  getAlumnsByHorario,
  getHorarioForMatricula,
  getAllHorarioWithCourses
} = require('../controllers/horario')
const { validateCreateHorario, validateChangeStatus } = require('./../validators/horario')
const { adminSession, alumnSession, teacherSession } = require('../middlewares/sessionValidator')

const router = Router()

router.post('/', validateCreateHorario, createHorario)

router.get('/', adminSession, getAllHorarioWithCourses)

router.put('/', validateChangeStatus, changeStatus)

router.get('/profesor/:idProfesor', getAllHorarioByTeacher)

router.get('/alumno/:idHorario', teacherSession, getAlumnsByHorario) // revisar después de matricular alumnos

router.get('/nivel/:nivel/:idAlumno', alumnSession, getHorarioForMatricula)

module.exports = router
