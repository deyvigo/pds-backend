// Importamos los módulos necesarios, incluyendo modelos de base de datos para operaciones con profesores,
// la función para cifrar contraseñas y la función para obtener información de inicio de sesión de profesores.
const { getAll, insertOne, updateStatusById, getAllActives } = require('../models/profesor')
const { encryptPass } = require('../helpers/bcrypt')
const { getTeacher } = require('./../models/login')

// funcion para obtener profesores de la base de datos y enviar la respuesta al cliente
const getAllTeachers = async (req, res) => {
  const response = await getAll()
  res.send(response)
}

// func para registrar nuevos profesores recibiendo los datos
const registerTeacher = async (req, res) => {
  const { nombres, apellidos, username, password, estado, rol } = req.body
  const hashPass = await encryptPass(password)
  // console.log({ nombres, apellidos, username, hashPass, estado, rol })
  const userTeacher = await getTeacher(username)
  if (userTeacher.length !== 0) {
    res.send({ error: 'El nombre de usuario ya existe' })
    return
  }
  // Insertamos los datos del nuevo profesor en la base de datos.
  const response = await insertOne({ nombres, apellidos, username, hashPass, estado, rol })
  res.status(201)
  res.send(response)
}

// con esta función otorgamos permisos a la cuenta de un profesor
const grantPermitToTeacherAccount = async (req, res) => {
  const { idProfesor, idAutorizante, estado } = req.body
  // Actualizamos el estado de la cuenta del profesor en la base de datos.
  const response = await updateStatusById({ idProfesor, estado, idAutorizante })
  res.send(response)
}

const getAllActivesTeachers = async (req, res) => {
  const response = await getAllActives()
  res.send(response)
}

module.exports = { getAllTeachers, registerTeacher, grantPermitToTeacherAccount, getAllActivesTeachers }
