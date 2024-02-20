const { insertOne, getByIdCourse } = require('./../models/tema')

const createOneTheme = async (req, res) => {
  const { idCurso, nombre, descripcion } = req.body
  const response = await insertOne({ idCurso, nombre, descripcion })
  res.send(response)
}

const getAllByCourse = async (req, res) => {
  const { idCurso } = req.body
  const response = await getByIdCourse({ idCurso })
  res.send(response)
}
module.exports = { createOneTheme, getAllByCourse }
