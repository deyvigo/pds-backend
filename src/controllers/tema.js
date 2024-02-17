const { insertOne } = require('./../models/tema')

const createOneTheme = async (req, res) => {
  const { idCurso, nombre, descripcion } = req.body
  const response = await insertOne({ idCurso, nombre, descripcion })
  res.send(response)
}

module.exports = { createOneTheme }
