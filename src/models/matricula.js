const { connection } = require('./../services/connection.bd')

const createOne = async (data) => {
  try {
    await connection.query(
      'INSERT INTO alumno_horario (id_alumn, id_horario) VALUES ?;',
      [data]
    )
    return { response: 'Registro existoso' }
  } catch (e) {
    console.error(e)
  }
}

const getByIdAlumn = async ({ idAlumno }) => {
  try {
    const [response] = await connection.query(
      'SELECT h.id_horario, h.dia_semana, h.hora_inicio, h.hora_final, h.id_profesor_cargo, h.estado, ci.ciclo, c.nivel, c.nombre FROM alumno_horario ah JOIN horario h ON h.id_horario = ah.id_horario JOIN ciclo ci ON ci.id_ciclo = h.ciclo_id JOIN curso c ON c.id_curso = h.id_curso WHERE (h.estado = "activo" OR h.estado = "en curso") AND ah.id_alumn = ?;',
      [idAlumno]
    )
    return response
  } catch (e) {
    console.error(e)
  }
}

module.exports = { createOne, getByIdAlumn }
