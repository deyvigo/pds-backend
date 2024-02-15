const { insertOne } = require('./../models/administrador')
const { encryptPass } = require('./../helpers/bcrypt')
const { getAdmin } = require('../models/login')

const registerAdministrador = async (req, res) => {
  const { nombres, apellidos, username, password, rol } = req.body
  const hashPass = await encryptPass(password)
  const userAdmin = await getAdmin(username)
  if (userAdmin.length !== 0) {
    res.send({ error: 'User already exists' })
    return
  }
  const response = await insertOne({ nombres, apellidos, username, hashPass, rol })
  res.status(201)
  res.send(response)
}

module.exports = { registerAdministrador }
