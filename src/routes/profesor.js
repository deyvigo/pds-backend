const { Router } = require('express')
const { getAllTeachers, registerTeacher } = require('../controllers/profesor')
const { validateCreateTeacher } = require('../validators/profesor')

const router = Router()

router.get('/', getAllTeachers)

router.post('/', validateCreateTeacher, registerTeacher)

module.exports = router
