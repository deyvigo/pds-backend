const { Router } = require('express')
const { createAsist } = require('./../controllers/asistencia')
const { validateAsist } = require('./../validators/asistencia')

const router = Router()

router.post('/', validateAsist, createAsist)

module.exports = router
