const { Router } = require('express')
const { getAllTeachers, registerTeacher, grantPermitToTeacherAccount } = require('../controllers/profesor')
const { validateCreateTeacher, validateUpdateStatusTeacher } = require('../validators/profesor')

const router = Router()

router.get('/', getAllTeachers)

router.post('/', validateCreateTeacher, registerTeacher)

router.put('/autorizar', validateUpdateStatusTeacher, grantPermitToTeacherAccount)

module.exports = router
