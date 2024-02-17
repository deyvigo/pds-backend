const { Router } = require('express')
const { createHorario, getAllHorario, changeStatus } = require('../controllers/horario')
const { validateCreateHorario, validateChangeStatus } = require('./../validators/horario')

const router = Router()

router.post('/', validateCreateHorario, createHorario)

router.get('/', getAllHorario)

router.put('/', validateChangeStatus, changeStatus)

module.exports = router
