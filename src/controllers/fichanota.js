const { createNotesForAll, getCourseCompletedByAlumn } = require('./../models/fichanota')
const { createExposicionNotesForAll } = require('./../models/notaexposicion')

const registerNotes = async (req, res) => {
  try {
    const { data } = req.body

    const valuesFN = data.map(d => ([
      Math.round(0.4 * parseInt(d.notaEvaEscrita) + 0.2 * parseInt(d.notaEvaOral) + 0.4 * (parseInt(d.puntosTiempo) + parseInt(d.puntosContenido) + parseInt(d.puntosHabComu) + parseInt(d.puntosEstructura))),
      d.notaEvaOral, d.notaEvaEscrita, d.idTema, d.idCiclo, d.idAlumno, d.idProfesor
    ]))

    const index = await createNotesForAll(valuesFN)

    const firstId = index[0].insertId
    // usar los índices obtenidos para guardar en nota_exposición
    const valuesNE = data.map((d, index) => ([
      d.puntosTiempo, d.puntosHabComu, d.puntosEstructura, d.puntosContenido, firstId + index
    ]))

    const response = await createExposicionNotesForAll(valuesNE)
    res.send(response)
  } catch (e) {
    console.error(e)
    res.status(500)
    res.send({ error: 'Error interno del servidor' })
  }
}

const getStatsByAlumn = async (req, res) => {
  const { idAlumno } = req.params
  const data = await getCourseCompletedByAlumn({ idAlumno }) // id_curso, nombre (estado de horario = finalizado)
  // data[1] = curso en el que está matriculado

  if (data[1].length === 0) {
    res.status(404)
    res.send({ repsonse: 'No tienes cursos finalizados' })
    return
  }

  const response = data[0].map(c => ({
    id_curso: c.id_curso,
    curso: c.nombre,
    nivel: c.nivel,
    id_ciclo: c.id_ciclo,
    ciclo: c.ciclo,
    fecha_inicio: c.fecha_inicio,
    fecha_final: c.fecha_final,
    profesor: `${c.nombres} ${c.apellidos}`,
    promedio: data[1].filter(t => {
      return t.id_curso_pertenece === c.id_curso && t.id_ciclo === c.id_ciclo
    }).reduce((acc, t) => {
      return acc + t.nota_final
    }, 0) / data[1].filter(t => {
      return t.id_curso_pertenece === c.id_curso && t.id_ciclo === c.id_ciclo
    }).length,
    temas: data[1].filter(t => {
      return t.id_curso_pertenece === c.id_curso && t.id_ciclo === c.id_ciclo
    }).map(t => ({
      id_ciclo: t.id_ciclo,
      tema: t.nombre,
      id_tema: t.id_tema,
      nota: t.nota_final
    }))
  }))

  res.send(response)
}

module.exports = { registerNotes, getStatsByAlumn }
