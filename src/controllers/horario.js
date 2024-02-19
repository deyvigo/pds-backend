const { insertOne, getByCourse, changeStatusById, getHorarioByIdTeacher, getAllAlumnByHorario } = require('./../models/horario')
const { getAllActives } = require('./../models/profesor')

const createHorario = async (req, res) => {
  const { dia, estado, horaInicio, horaFinal, ciclo, idProfesor, idCurso } = req.body
  // console.log({ dia, estado, horaInicio, horaFinal, idProfesor, idCurso })
  const response = await insertOne({ dia, estado, horaInicio, horaFinal, ciclo, idProfesor, idCurso })
  res.status(201)
  res.send(response)
}

const getAllHorarioByCourse = async (req, res) => {
  const { idCurso } = req.body
  const horario = await getByCourse(idCurso)
  const profesor = await getAllActives()
  const data = [horario, profesor]
  const response = {
    horario: data[0].map(h => ({
      id_horario: h.id_horario,
      dia_semana: h.dia_semana,
      estado: h.estado,
      hora_inicio: h.hora_inicio,
      hora_final: h.hora_final,
      ciclo: h.ciclo,
      profesor: data[1][0].filter(p => {
        return p.id_profesor === h.id_profesor
      }).map(p => ({
        id_profesor: p.id_profesor,
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

const getAllHorarioByTeacher = async (req, res) => {
  const { idProfesor } = req.body
  const response = await getHorarioByIdTeacher({ idProfesor })
  res.send(response)
}

const getAlumnsByHorario = async (req, res) => {
  const { idHorario } = req.body
  const response = await getAllAlumnByHorario({ idHorario })
  res.send(response)
}

module.exports = { createHorario, getAllHorarioByCourse, changeStatus, getAllHorarioByTeacher, getAlumnsByHorario }
