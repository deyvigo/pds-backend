const { connection } = require('./../services/connection.bd')

const insertOne = async ({ dia, estado, horaInicio, horaFinal, idProfesor, idCurso }) => {
  try {
    await connection.execute(
      'INSERT INTO horario (dia_semana, estado, hora_inicio, hora_final, id_profesor_cargo, id_curso) VALUES (?,?,?,?,?,?)',
      [dia, estado, horaInicio, horaFinal, idProfesor, idCurso]
    )
    return { response: 'Registro exitoso' }
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getByCourse = async (id) => {
  try {
    const [horario] = await connection.query(
      'SELECT h.id_horario, h.dia_semana, h.estado, h.hora_inicio, h.hora_final, p.id_profesor FROM horario h JOIN profesor p ON p.id_profesor = h.id_profesor_cargo JOIN curso c ON c.id_curso = h.id_curso WHERE c.id_curso = ?;',
      [id]
    )
    const [profesor] = await connection.query(
      'SELECT p.id_profesor, p.nombres, p.apellidos FROM horario h JOIN profesor p ON p.id_profesor = h.id_profesor_cargo JOIN curso c ON c.id_curso = h.id_curso WHERE c.id_curso = ?;',
      [id]
    )
    return [horario, profesor]
  } catch (e) {
    console.error(e)
    throw e
  }
}

const changeStatusById = async ({ idHorario, estado }) => {
  try {
    await connection.execute(
      'UPDATE horario SET estado = ? WHERE id_horario = ?;',
      [estado, idHorario]
    )
    return { response: 'Estado cambiado' }
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = { insertOne, getByCourse, changeStatusById }
