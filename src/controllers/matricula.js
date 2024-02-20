const { createOne, getByIdAlumn } = require('./../models/matricula')
const { getById } = require('./../models/alumno')
const { getAllActives } = require('./../models/profesor')

const createMatricula = async (req, res) => {
  const { data } = req.body
  const values = data.map(m => ([
    m.idAlumno, m.idHorario
  ]))
  const response = await createOne(values)
  res.send(response)
}

const getFichaMatriculaByAlumn = async (req, res) => {
  const { idAlumno } = req.body
  const horario = await getByIdAlumn({ idAlumno })
  const [alumn] = await getById({ idAlumno }) // Solo recibe un alumno
  const profesor = await getAllActives()
  if (horario.length === 0) {
    res.status(404)
    res.send({ response: 'No está matriculado en ningún curso' })
    return
  }
  const response = {
    matricula: {
      id_alumno: alumn.id_alumno,
      nombres: alumn.nombres,
      apellidos: alumn.apellidos,
      nivel: alumn.nivel,
      horarios: horario.map(h => ({
        id_horario: h.id_horario,
        nombre: h.nombre,
        dia_semana: h.dia_semana,
        hora_inicio: h.hora_inicio,
        hora_final: h.hora_final,
        estado: h.estado,
        ciclo: h.ciclo,
        nivel: h.nivel,
        profesor: profesor.filter(p => {
          return p.id_profesor === h.id_profesor_cargo
        }).map(p => ({
          id_profesor: p.id_profesor,
          nombres: p.nombres,
          apellidos: p.apellidos
        }))
      }))
    }
  }
  res.send(response)
}

module.exports = { createMatricula, getFichaMatriculaByAlumn }
