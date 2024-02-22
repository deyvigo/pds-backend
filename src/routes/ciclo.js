const { Router } = require('express')
const { createCicle, getAllCicles } = require('./../controllers/ciclo')
const { validateCicle } = require('./../validators/ciclo')
const { adminSession } = require('./../middlewares/sessionValidator')

const router = Router()

router.post('/', adminSession, validateCicle, createCicle)

router.get('/', adminSession, getAllCicles)

module.exports = router
