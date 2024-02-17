const { insertOne, getByCourse, changeStatusById } = require('./../models/horario')

const createHorario = async (req, res) => {
  const { dia, estado, horaInicio, horaFinal, idProfesor, idCurso } = req.body
  // console.log({ dia, estado, horaInicio, horaFinal, idProfesor, idCurso })
  const response = await insertOne({ dia, estado, horaInicio, horaFinal, idProfesor, idCurso })
  res.status(201)
  res.send(response)
}

const getAllHorarioByCourse = async (req, res) => {
  const { idCurso } = req.body
  const data = await getByCourse(idCurso)
  const response = {
    horario: data[0].map(h => ({
      id_horario: h.id_horario,
      dia_semana: h.dia_semana,
      estado: h.estado,
      hora_inicio: h.hora_inicio,
      hora_final: h.hora_final,
      profesor: data[1].filter(p => {
        return p.id_profesor === h.id_profesor
      }).map(p => ({
        nombres: p.nombres,
        apellidos: p.apellidos
      })).pop()
    }))
  }
  res.send(response)
}

const changeStatus = async (req, res) => {
  const { idHorario, estado } = req.body
  const response = await changeStatusById({ idHorario, estado })
  res.send(response)
}

module.exports = { createHorario, getAllHorarioByCourse, changeStatus }
