const { Router } = require('express')
const { validateLoginCredentials } = require('../validators/login')
const { loginAlumn, loginTeacher, loginAdmin } = require('../controllers/login')

const router = Router()

router.post('/alumno', validateLoginCredentials, loginAlumn)

router.post('/profesor', validateLoginCredentials, loginTeacher)

router.post('/administrador', validateLoginCredentials, loginAdmin)

module.exports = router
