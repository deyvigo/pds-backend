const { Router } = require('express')
const { obtainCertificate } = require('../controllers/certificado')
const { alumnSession } = require('../middlewares/sessionValidator')
const { validateCertificateData } = require('../validators/certificado')

const router = Router()

router.get('/', (req, res) => {
  console.log(__dirname)
  res.send('Certificado creado')
})

router.post('/', alumnSession, validateCertificateData, obtainCertificate)

module.exports = router
