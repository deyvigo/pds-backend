const { verifyJwt } = require('./../helpers/handleJwt')

const alumnSession = async (req, res, next) => {
  console.log(req.headers.authorization === null)
  try {
    if (req.headers.authorization === undefined) {
      res.status(401)
      res.send({ error: 'No Token' })
      return
    }
    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyJwt(token)
    if (dataToken.role === 'ROL_ALUMNO' || dataToken.role === 'ROL_ADMINISTRADOR') {
      console.log('Authorized')
      next()
      return
    }
    res.status(401)
    res.send({ error: 'Unauthorized' })
  } catch (e) {
    res.status(401)
    res.send({ error: 'Not session' })
  }
}

const teacherSession = async (req, res, next) => {
  console.log(req.headers.authorization === null)
  try {
    if (req.headers.authorization === undefined) {
      res.status(401)
      res.send({ error: 'No Token' })
      return
    }
    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyJwt(token)
    if (dataToken.role === 'ROL_PROFESOR' || dataToken.role === 'ROL_ADMINISTRADOR') {
      console.log('Authorized')
      next()
      return
    }
    res.status(401)
    res.send({ error: 'Unauthorized' })
  } catch (e) {
    res.status(401)
    res.send({ error: 'Not session' })
  }
}

module.exports = { alumnSession, teacherSession }
