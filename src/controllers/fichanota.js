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
  const response = {
    curso: data[0].map(d => ({
      id_curso: d.id_curso,
      nombre: d.nombre,
      nivel: d.nivel,
      profesor: `${d.nombres} ${d.apellidos}`,
      promedio: '10.4', // corregir cuando la bd esté mejor organizada
      ciclo: d.ciclo,
      temas: data[1].filter(t => {
        return t.id_curso_pertenece === d.id_curso
      }).map(t => ({
        id_curso_pertenece: t.id_curso_pertenece,
        id_tema: t.id_tema,
        nombre: t.nombre,
        descripcion: t.descripcion,
        notas: data[2].filter(n => {
          return n.id_tema === t.id_tema
        }).map(n => ({
          id_tema: n.id_tema,
          ciclo: n.ciclo,
          nota_eva_escrita: n.nota_eva_escrita,
          nota_eva_oral: n.nota_eva_oral,
          nota_final: n.nota_final,
          nota_exposicion: {
            puntos_contenido: n.puntos_contenido,
            puntos_estructura: n.puntos_estructura,
            puntos_hab_comu: n.puntos_hab_comu,
            puntos_tiempo: n.puntos_tiempo
          }
        }))
      }))
    }))
  }
  res.send(response)
}

module.exports = { registerNotes, getStatsByAlumn }
