const { createOne, getAllCourses, getAllCoursesByIdProfesor } = require('./../models/curso')
const { getAllAdmin } = require('./../models/administrador')

const createCourse = async (req, res) => {
  const { codigo, nombre, nivel, requisito, idCreador } = req.body
  const response = await createOne({ codigo, nombre, nivel, requisito, idCreador })
  res.status(200)
  res.send(response)
}

const getAllCoursesWithAdmin = async (req, res) => {
  const curso = await getAllCourses()
  const profesor = await getAllAdmin()
  const data = [curso, profesor]
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

const getAllCoursesForTeacher = async (req, res) => {
  const { idProfesor } = req.params
  const cursos = await getAllCoursesByIdProfesor({ idProfesor })
  if (cursos.length === 0) {
    res.status(404)
    res.send({ error: 'No se encontraron cursos' })
    return
  }
  res.send(cursos)
}

module.exports = { createCourse, getAllCoursesWithAdmin, getAllCoursesForTeacher }
