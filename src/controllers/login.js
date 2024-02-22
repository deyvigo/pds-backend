const { getAlumn, getTeacher, getAdmin } = require('./../models/login')
const { comparePass } = require('./../helpers/bcrypt') // función para comparar contraseñas
const { createJwt } = require('./../helpers/handleJwt') // función para crear tokens JWT

// Función para iniciar sesión como alumno.
const loginAlumn = async (req, res) => {
  // Extraemos el nombre de usuario y la contraseña del cuerpo de la solicitud.
  const { username, password } = req.body
  // Buscamos al alumno en la base de datos.
  const response = await getAlumn(username)
  // console.log(response.length)
  if (response.length === 0) {
    res.status(404)
    res.send({ error: 'User not found' })
    return
  }
  // Comparamos la contraseña proporcionada con la contraseña almacenada en la base de datos.
  const checkPass = await comparePass(password, response[0].password)
  const { rol, id, nombres, apellidos, nivel } = response[0]
  // Si la contraseña es correcta, creamos un token JWT y lo enviamos junto con la información del usuario.
  if (checkPass) {
    const jwt = await createJwt({ id, username, rol })
    res.status(200)
    res.send({ id, rol, nombres, username, apellidos, nivel, token: jwt })
  } else {
    // Si la contraseña es incorrecta, devolvemos un mensaje de error
    res.status(401)
    res.send({ error: 'Invalid Password' })
  }
}

// El mismo proceso pero para las credenciales del profesor
const loginTeacher = async (req, res) => {
  const { username, password } = req.body
  const response = await getTeacher(username)
  if (response.length === 0 || response[0].estado === 'inactivo') {
    res.status(404)
    res.send({ error: 'User not found' })
    return
  }
  const checkPass = await comparePass(password, response[0].password)
  // console.log(response[0])
  const { rol, id, nombres, apellidos } = response[0]
  if (checkPass) {
    const jwt = await createJwt({ id, username, rol })
    res.status(200)
    res.send({ id, nombres, rol, username, apellidos, token: jwt })
  } else {
    res.status(401)
    res.send({ error: 'Invalid Password' })
  }
}

// el mismo proceso para las credenciales del administrador
const loginAdmin = async (req, res) => {
  const { username, password } = req.body
  const response = await getAdmin(username)
  // console.log(response.length)
  if (response.length === 0) {
    res.status(404)
    res.send({ error: 'User not found' })
    return
  }
  const checkPass = await comparePass(password, response[0].password)
  const { rol, id, nombres, apellidos } = response[0]
  if (checkPass) {
    const jwt = await createJwt({ id, username, rol })
    res.status(200)
    res.send({ id, nombres, rol, username, apellidos, token: jwt })
  } else {
    res.status(401)
    res.send({ error: 'Invalid Password' })
  }
}

// exportamos las funciones de login
module.exports = { loginAlumn, loginTeacher, loginAdmin }
