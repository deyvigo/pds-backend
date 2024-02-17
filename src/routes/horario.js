const { Router } = require('express')
const { createHorario, getAllHorario } = require('../controllers/horario')
const { validateCreateHorario } = require('./../validators/horario')

const router = Router()

router.post('/', validateCreateHorario, createHorario)

router.get('/', getAllHorario)

module.exports = router
