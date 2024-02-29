const { connection } = require('./../services/connection.bd')

const createNotesForAll = async (values) => {
  try {
    const response = await connection.query(
      'INSERT INTO ficha_nota (nota_final, nota_eva_oral, nota_eva_escrita, id_tema, id_ciclo, id_alumno, profesor_id) VALUES ?;',
      [values]
    )
    return response
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getCourseCompletedByAlumn = async ({ idAlumno }) => {
  try {
    const [curso] = await connection.query(
      'SELECT DISTINCT(c.nombre), c.id_curso, c.nivel, h.ciclo_id, ci.id_ciclo, ci.ciclo, ci.inicio AS fecha_inicio, ci.fin AS fecha_final, p.nombres, p.apellidos FROM alumno_horario ah JOIN horario h ON ah.id_horario = h.id_horario JOIN curso c ON h.id_curso = c.id_curso JOIN ciclo ci ON ci.id_ciclo = h.ciclo_id JOIN profesor p ON p.id_profesor = h.id_profesor_cargo WHERE ah.id_alumn = ? AND h.estado = "finalizado";',
      [idAlumno]
    )
    // const [temas] = await connection.query(
    //   'SELECT DISTINCT(t.nombre), c.id_curso, t.id_tema FROM alumno_horario ah JOIN horario h ON ah.id_horario = h.id_horario JOIN curso c ON h.id_curso = c.id_curso JOIN tema t ON t.id_curso_pertenece = c.id_curso WHERE ah.id_alumn = ? AND h.estado = "finalizado";',
    //   [idAlumno]
    // )
    const [notas] = await connection.query(
      'SELECT fn.id_tema, t.nombre, fn.nota_final, t.id_curso_pertenece, ci.id_ciclo FROM ficha_nota fn JOIN tema t ON fn.id_tema = t.id_tema JOIN ciclo ci ON ci.id_ciclo = fn.id_ciclo WHERE fn.id_alumno = ?;',
      [idAlumno]
    )
    return [curso, notas]
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getFinalAverages = async ({ idHorario, idCiclo }) => {
  try {
    const [response] = await connection.query(
      'SELECT a.id_alumno, a.nombres, ah.id_horario, AVG(fn.nota_final) as promedio, c.nombre, c.nivel FROM alumno_horario ah JOIN alumno a ON a.id_alumno = ah.id_alumn JOIN ficha_nota fn ON a.id_alumno = fn.id_alumno JOIN horario h ON ah.id_horario = h.id_horario JOIN curso c ON c.id_curso = h.id_curso WHERE ah.id_horario = ? AND fn.id_ciclo = ? GROUP BY a.id_alumno;',
      [idHorario, idCiclo]
    )
    return response
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = { createNotesForAll, getCourseCompletedByAlumn, getFinalAverages }
