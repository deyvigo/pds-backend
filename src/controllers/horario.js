const { insertOne, getAllHorario, changeStatusById, getHorarioByIdTeacher, getAllAlumnByHorario, getActivesByNivel } = require('./../models/horario')
const { getAll, getAllActives } = require('./../models/profesor')
const { getAllCourses } = require('./../models/curso')
const { getByIdAlumn } = require('./../models/matricula')
const { getFinalAverages } = require('./../models/fichanota')
const { changeLevelById } = require('./../models/alumno')

const createHorario = async (req, res) => {
  const { dia, estado, horaInicio, horaFinal, ciclo, idProfesor, idCurso } = req.body
  // console.log({ dia, estado, horaInicio, horaFinal, idProfesor, idCurso })
  const response = await insertOne({ dia, estado, horaInicio, horaFinal, ciclo, idProfesor, idCurso })
  res.status(201)
  res.send(response)
}

const getAllHorarioWithCourses = async (req, res) => {
  const horario = await getAllHorario()
  const profesor = await getAll()
  const curso = await getAllCourses()
  const response = {
    cursos: curso.map(c => ({
      id_curso: c.id_curso,
      nombre: c.nombre,
      horarios: horario.filter(h => {
        return h.id_curso === c.id_curso
      }).map(h => ({
        id_horario: h.id_horario,
        estado: h.estado,
        dia_semana: h.dia_semana,
        hora_inicio: h.hora_inicio,
        hora_final: h.hora_final,
        id_ciclo: h.id_ciclo,
        ciclo: h.ciclo,
        profesor: profesor.filter(p => {
          return p.id_profesor === h.id_profesor_cargo
        }).map(p => ({
          id_profesor: p.id_profesor,
          nombres: p.nombres,
          apellidos: p.apellidos
        }))
      }))
    }))
  }
  res.send(response)
}

const changeStatus = async (req, res) => {
  const { idHorario, idCiclo, estado } = req.body

  if (estado === 'finalizado') {
    const averages = await getFinalAverages({ idHorario, idCiclo })
    if (averages.length === 0) {
      res.status(404)
      res.send({ response: 'No hay alumnos matriculados' })
      return
    }
    const nivel = averages[0].nivel
    const aproved = averages.filter(a => a.promedio >= 10.5).map(a => (a.id_alumno))
    console.log(averages)
    if (aproved.length > 0) {
      const response = await changeLevelById(nivel + 1, aproved)
      console.log(response) // verificar si se cambió el nivel
    }

    if (aproved.length === 0) {
      console.log('No hay alumnos aprobados')
    }

    const change = await changeStatusById({ idHorario, estado })
    res.send(change)
    return
  }

  const response = await changeStatusById({ idHorario, estado })
  res.send(response)
}

const getAllHorarioByTeacher = async (req, res) => {
  const { idProfesor } = req.params
  const response = await getHorarioByIdTeacher({ idProfesor })
  if (response.length === 0) {
    res.status(404)
    res.send({ response: 'No tienes horarios en curso' })
    return
  }
  res.send(response)
}

const getAlumnsByHorario = async (req, res) => {
  const { idHorario } = req.params
  const response = await getAllAlumnByHorario({ idHorario })
  if (response.length === 0) {
    res.status(404)
    res.send({ response: 'Nadie se ha matriculado todavía' })
    return
  }
  res.send(response)
}

const getHorarioForMatricula = async (req, res) => {
  const { nivel, idAlumno } = req.params
  const matriculas = await getByIdAlumn({ idAlumno }) // verifica si ya hay matrículas activas o en curso

  if (matriculas.length > 0) {
    res.send({ response: 'Ya estás matriculado' })
    return
  }
  const horario = await getActivesByNivel({ nivel })
  const profesor = await getAllActives()

  const response = {
    horarios: horario.map(h => ({
      id_horario: h.id_horario,
      estado: h.estado,
      dia_semana: h.dia_semana,
      hora_inicio: h.hora_inicio,
      hora_final: h.hora_final,
      ciclo: h.ciclo,
      nivel: h.nivel,
      curso: h.nombre,
      profesor: profesor.filter(p => {
        return p.id_profesor === h.id_profesor_cargo
      }).map(p => ({
        id_profesor: p.id_profesor,
        nombres: p.nombres,
        apellidos: p.apellidos
      }))
    }))
  }

  res.send(response)
}

module.exports = {
  createHorario,
  getAllHorarioWithCourses,
  changeStatus,
  getAllHorarioByTeacher,
  getAlumnsByHorario,
  getHorarioForMatricula
}
