const { insertOne, getAllWithTheme, getAllByIdCourseWithNoRepetitions } = require('./../models/tema')
const { getAllCourses } = require('./../models/curso')

const createOneTheme = async (req, res) => {
  const { idCurso, nombre, descripcion } = req.body
  const response = await insertOne({ idCurso, nombre, descripcion })
  res.send(response)
}

const getAllThemesWithCourse = async (req, res) => {
  const courses = await getAllCourses()
  const themes = await getAllWithTheme()
  const response = {
    curso: courses.map(c => ({
      nombre: c.nombre,
      id_curso: c.id_curso,
      temas: themes.filter(t => t.id_curso_pertenece === c.id_curso)
    }))
  }
  res.send(response)
}

const getAllThemesByCourse = async (req, res) => {
  const { idCurso, idProfesor } = req.params
  console.log(idCurso)
  const response = await getAllByIdCourseWithNoRepetitions({ idCurso, idProfesor })
  res.send(response)
}

module.exports = { createOneTheme, getAllThemesWithCourse, getAllThemesByCourse }
