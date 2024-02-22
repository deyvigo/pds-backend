const { Router } = require('express')
const { getAllTeachers, registerTeacher, grantPermitToTeacherAccount, getAllActivesTeachers } = require('../controllers/profesor')
const { validateCreateTeacher, validateUpdateStatusTeacher } = require('../validators/profesor')
const { adminSession } = require('../middlewares/sessionValidator')

const router = Router()

router.get('/', getAllTeachers)

router.post('/', validateCreateTeacher, registerTeacher)

router.put('/autorizar', validateUpdateStatusTeacher, grantPermitToTeacherAccount)

router.get('/activos', adminSession, getAllActivesTeachers)

module.exports = router
