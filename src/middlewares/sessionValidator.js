const { verifyJwt } = require('./../helpers/handleJwt')

// Estas 3 funciones son Middleware que permiten verificar las sesiones antes de permitir el acceso
//    Verifican  si se ha proporcionado un token de autorización en la cabecera de la solicitud
//    extraen el token de la cabecera de la solicitud y lo verifican utilizando la función verifyJwt
//    manejan los casos en los que no se proporciona un token
//    evuelven un estado de respuesta adecuado

const alumnSession = async (req, res, next) => {
  // console.log(req.headers.authorization === null)
  try {
    if (req.headers.authorization === undefined) {
      res.status(401)
      res.send({ error: 'No Token' })
      return
    }
    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyJwt(token)
    if (dataToken.rol === 'ROL_ALUMNO' || dataToken.rol === 'ROL_ADMINISTRADOR') {
      // console.log('Authorized')
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
  // console.log(req.headers.authorization === null)
  try {
    if (req.headers.authorization === undefined) {
      res.status(401)
      res.send({ error: 'No Token' })
      return
    }
    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyJwt(token)
    if (dataToken.rol === 'ROL_PROFESOR' || dataToken.rol === 'ROL_ADMINISTRADOR') {
      // console.log('Authorized')
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

const adminSession = async (req, res, next) => {
  // console.log(req.headers.authorization === null)
  try {
    if (req.headers.authorization === undefined) {
      res.status(401)
      res.send({ error: 'No Token' })
      return
    }
    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyJwt(token)
    if (dataToken.rol === 'ROL_ADMINISTRADOR') {
      // console.log('Authorized')
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

module.exports = { alumnSession, teacherSession, adminSession }
