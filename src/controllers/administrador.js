// Este controlador maneja la creación de nuevos administradores en el sistema.
const { insertOne } = require('./../models/administrador')
const { encryptPass } = require('./../helpers/bcrypt') // función para cifrar contraseñas
const { getAdmin } = require('../models/login')

const registerAdministrador = async (req, res) => {
  const { nombres, apellidos, username, password, rol } = req.body // extraemos los datos de la solicitud
  const hashPass = await encryptPass(password) // ciframos la contraseña
  const userAdmin = await getAdmin(username)
  if (userAdmin.length !== 0) {
    res.send({ error: 'User already exists' })
    return
  }
  const response = await insertOne({ nombres, apellidos, username, hashPass, rol }) // insertamos datos en la base de datos
  res.status(201)
  res.send(response)
}

// exportamos la función creada
module.exports = { registerAdministrador }
