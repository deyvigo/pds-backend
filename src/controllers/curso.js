const { createOne, getAll } = require('./../models/curso')

const createCourse = async (req, res) => {
  const { codigo, nombre, nivel, requisito, idCreador } = req.body
  const response = await createOne({ codigo, nombre, nivel, requisito, idCreador })
  res.status(201)
  res.send(response)
}

const getAllCourses = async (req, res) => {
  const response = await getAll()
  res.send(response)
}

module.exports = { createCourse, getAllCourses }
