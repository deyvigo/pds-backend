const { getAll, insertOne } = require('../models/profesor')
const { encryptPass } = require('../helpers/bcrypt')

const getAllTeachers = async (req, res) => {
  const response = await getAll()
  res.send(response)
}

const registerTeacher = async (req, res) => {
  const { nombres, apellidos, username, password, estado, rol } = req.body
  const hashPass = await encryptPass(password)
  // console.log({ nombres, apellidos, username, hashPass, estado, rol })
  const response = await insertOne({ nombres, apellidos, username, hashPass, estado, rol })
  res.status(201)
  res.send(response)
}

module.exports = { getAllTeachers, registerTeacher }
