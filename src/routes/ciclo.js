const { Router } = require('express')
const { createCicle, getAllCicles } = require('./../controllers/ciclo')
const { validateCicle } = require('./../validators/ciclo')

const router = Router()

router.post('/', validateCicle, createCicle)

router.get('/', getAllCicles)

module.exports = router
