const { createOne, getAll } = require('./../models/curso')

const createCourse = async (req, res) => {
  const { codigo, nombre, nivel, requisito, idCreador } = req.body
  const response = await createOne({ codigo, nombre, nivel, requisito, idCreador })
  res.status(201)
  res.send(response)
}

const getAllCourses = async (req, res) => {
  const data = await getAll()
  const response = {
    curso: data[0].map((c) => ({
      id_curso: c.id_curso,
      nombre: c.nombre,
      codigo_curso: c.codigo_curso,
      nivel: c.nivel,
      requisito: c.requisito,
      creador: data[1].filter(a => {
        return a.id_administrador === c.id_creador_curso
      }).map((a) => ({
        nombres: a.nombres,
        apellidos: a.apellidos
      })).pop()
    }))
  }
  res.send(response)
}

module.exports = { createCourse, getAllCourses }
