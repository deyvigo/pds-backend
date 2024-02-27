const { connection } = require('./../services/connection.bd')

const insertOne = async ({ dia, estado, horaInicio, horaFinal, ciclo, idProfesor, idCurso }) => {
  try {
    await connection.execute(
      'INSERT INTO horario (dia_semana, estado, hora_inicio, hora_final, ciclo_id, id_profesor_cargo, id_curso) VALUES (?,?,?,?,?,?,?)',
      [dia, estado, horaInicio, horaFinal, ciclo, idProfesor, idCurso]
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
      'SELECT h.id_horario, h.dia_semana, h.estado, h.hora_inicio, h.hora_final, ci.ciclo, p.id_profesor FROM horario h JOIN profesor p ON p.id_profesor = h.id_profesor_cargo JOIN curso c ON c.id_curso = h.id_curso JOIN ciclo ci ON ci.id_ciclo = h.ciclo_id WHERE c.id_curso = ?;',
      [id]
    )
    return horario
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getAllHorario = async () => {
  try {
    const [horario] = await connection.query(
      'SELECT h.id_horario, h.dia_semana, h.hora_inicio, h.hora_final, h.estado, c.ciclo, c.id_ciclo, h.id_profesor_cargo, h.id_curso FROM horario h JOIN ciclo c ON c.id_ciclo = h.ciclo_id;'
    )
    return horario
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

const getHorarioByIdTeacher = async ({ idProfesor }) => {
  try {
    const [response] = await connection.query(
      'SELECT c.codigo_curso, c.nombre, h.id_horario, h.dia_semana, h.hora_inicio, h.hora_final, ci.ciclo, h.estado FROM horario h JOIN curso c ON c.id_curso = h.id_curso JOIN ciclo ci ON ci.id_ciclo = h.ciclo_id WHERE h.id_profesor_cargo = ? AND h.estado = "en curso";',
      [idProfesor]
    )
    return response
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getAllAlumnByHorario = async ({ idHorario }) => {
  try {
    const [response] = await connection.query(
      'SELECT h.id_horario, a.id_alumno, a.nombres, a.apellidos FROM alumno_horario ah JOIN alumno a ON ah.id_alumn = a.id_alumno JOIN horario h ON h.id_horario = ah.id_horario WHERE ah.id_horario = ?',
      [idHorario]
    )
    return response
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getActivesByNivel = async ({ nivel }) => {
  try {
    const [response] = await connection.query(
      'SELECT h.id_horario, h.dia_semana, h.hora_inicio, h.hora_final, h.estado, ci.ciclo, c.nivel, c.nombre, h.id_profesor_cargo FROM horario h JOIN curso c ON c.id_curso = h.id_curso JOIN ciclo ci ON ci.id_ciclo = h.ciclo_id WHERE h.estado = "activo" AND c.nivel = ?;',
      [nivel]
    )
    return response
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  insertOne,
  getByCourse,
  changeStatusById,
  getHorarioByIdTeacher,
  getAllAlumnByHorario,
  getActivesByNivel,
  getAllHorario
}
