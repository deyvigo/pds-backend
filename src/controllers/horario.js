const { insertOne, getAll } = require('./../models/horario')

const createHorario = async (req, res) => {
  const { dia, estado, horaInicio, horaFinal, idProfesor, idCurso } = req.body
  // console.log({ dia, estado, horaInicio, horaFinal, idProfesor, idCurso })
  const response = await insertOne({ dia, estado, horaInicio, horaFinal, idProfesor, idCurso })
  res.status(201)
  res.send(response)
}

const getAllHorario = async (req, res) => {
  const response = await getAll()
  res.send(response)
}

module.exports = { createHorario, getAllHorario }
