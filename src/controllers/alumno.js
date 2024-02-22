// Importamos los módulos necesarios, incluyendo modelos de base de datos para operaciones con alumnos,
// la función para cifrar contraseñas y la función para obtener información sobre alumnos existentes.
const { getAll, insertOne, changeLevelByUsername } = require('../models/alumno')
const { encryptPass } = require('../helpers/bcrypt')
const { getAlumn } = require('./../models/login')

// función para obtener todos los estudiantes
const getAllStudents = async (req, res) => {
  const response = await getAll()
  res.send(response)
}

// Función para registrar un nuevo estudiante
const registerStudent = async (req, res) => {
  const { nombres, apellidos, nivel, username, password, rol } = req.body
  //  ciframos la contraseña
  const hashPass = await encryptPass(password)
  // console.log({ nombres, apellidos, username, hashPass, rol })
  const userAlumn = await getAlumn(username)
  if (userAlumn.length !== 0) {
    res.send({ error: 'El nombre de usuario ya existe' })
    return
  }

  //  Insertamos en la base de datos
  const response = await insertOne({ nombres, apellidos, nivel, username, hashPass, rol })
  res.status(201)
  res.send(response)
}

// Función para cambiar el nivel de estudiantes
const changeNivel = async (req, res) => {
  const { username, nivel } = req.body
  const response = await changeLevelByUsername({ username, nivel })
  res.status(200)
  res.send(response)
}

// Exportamos las funciones
module.exports = { getAllStudents, registerStudent, changeNivel }
