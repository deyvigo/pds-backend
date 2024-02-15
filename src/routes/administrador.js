const { Router } = require('express')
const { registerAdministrador } = require('../controllers/administrador')
const { validateCreateAdmin } = require('../validators/administrador')

const router = Router()

router.post('/', validateCreateAdmin, registerAdministrador)

module.exports = router
