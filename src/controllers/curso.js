const { createOne, getAll } = require('./../models/curso')

const createCourse = async (req, res) => {
  const { codigo, nombre, nivel, requisito, idCreador } = req.body
  const response = await createOne({ codigo, nombre, nivel, requisito, idCreador })
  res.status(201)
  res.send(response)
}

const getAllCourses = async (req, res) => {
  const response = await getAll()
  // response.map((c) => {
  //   c.id_curso,
  //   c.nombre,
  //   c.codigo_curso,
  //   c.nivel,
  //   c.requisito,
  //   creador: response[1].filter( a => {
  //     return a.id_administrador === c.id_creador_curso
  //   }).map( a => {
  //     a.nombres,
  //     a.apellidos
  //   })
  // }
  // res.send(response)
}

module.exports = { createCourse, getAllCourses }
