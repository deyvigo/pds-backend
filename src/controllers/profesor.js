const { getAll, insertOne } = require('../models/profesor')
const { encryptPass } = require('../helpers/bcrypt')
const { getTeacher } = require('./../models/login')

const getAllTeachers = async (req, res) => {
  const response = await getAll()
  res.send(response)
}

const registerTeacher = async (req, res) => {
  const { nombres, apellidos, username, password, estado, rol } = req.body
  const hashPass = await encryptPass(password)
  // console.log({ nombres, apellidos, username, hashPass, estado, rol })
  const userTeacher = await getTeacher(username)
  if (userTeacher.length !== 0) {
    res.send({ error: 'User already exists' })
  }
  const response = await insertOne({ nombres, apellidos, username, hashPass, estado, rol })
  res.status(201)
  res.send(response)
}

module.exports = { getAllTeachers, registerTeacher }
