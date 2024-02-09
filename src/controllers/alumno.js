const { getAll, insertOne } = require('../models/alumno')
const { encryptPass } = require('../helpers/bcrypt')

const getAllStudents = async (req, res) => {
  const response = await getAll()
  res.send(response)
}

const registerStudent = async (req, res) => {
  const { nombres, apellidos, username, password, rol } = req.body
  const hashPass = await encryptPass(password)
  console.log({ nombres, apellidos, username, hashPass, rol })
  const response = await insertOne({ nombres, apellidos, username, hashPass, rol })
  res.status(201)
  res.send(response)
}

module.exports = { getAllStudents, registerStudent }
