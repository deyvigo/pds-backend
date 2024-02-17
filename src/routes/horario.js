const { Router } = require('express')
const { createHorario, getAllHorarioByCourse, changeStatus } = require('../controllers/horario')
const { validateCreateHorario, validateChangeStatus, validateIdCourse } = require('./../validators/horario')

const router = Router()

router.post('/', validateCreateHorario, createHorario)

router.get('/', validateIdCourse, getAllHorarioByCourse)

router.put('/', validateChangeStatus, changeStatus)

module.exports = router
