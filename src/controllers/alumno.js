const { getAll, insertOne } = require('../models/alumno')
const { encryptPass } = require('../helpers/bcrypt')
const { getAlumn } = require('./../models/login')

const getAllStudents = async (req, res) => {
  const response = await getAll()
  res.send(response)
}

const registerStudent = async (req, res) => {
  const { nombres, apellidos, username, password, rol } = req.body
  const hashPass = await encryptPass(password)
  // console.log({ nombres, apellidos, username, hashPass, rol })
  const userAlumn = await getAlumn(username)
  if (userAlumn.length !== 0) {
    res.send({ error: 'User already exists' })
  }
  const response = await insertOne({ nombres, apellidos, username, hashPass, rol })
  res.status(201)
  res.send(response)
}

module.exports = { getAllStudents, registerStudent }
