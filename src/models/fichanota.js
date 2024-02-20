const { connection } = require('./../services/connection.bd')

const createNotesForAll = async (values) => {
  try {
    const response = await connection.query(
      'INSERT INTO ficha_nota (nota_final, nota_eva_oral, nota_eva_escrita, id_tema, id_ciclo, id_alumno) VALUES ?;',
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
      'SELECT DISTINCT h.id_curso, c.nombre FROM alumno_horario ah JOIN horario h ON h.id_horario = ah.id_horario JOIN curso c ON c.id_curso = h.id_curso WHERE h.estado = "finalizado" AND ah.id_alumn = ?;',
      [idAlumno]
    )
    const [temas] = await connection.query(
      'SELECT DISTINCT t.id_curso_pertenece, t.id_tema, t.nombre, t.descripcion FROM alumno_horario ah JOIN horario h ON h.id_horario = ah.id_horario JOIN ciclo ci ON ci.id_ciclo = h.ciclo_id JOIN curso c ON c.id_curso = h.id_curso JOIN tema t ON t.id_curso_pertenece = c.id_curso WHERE h.estado = "finalizado" AND ah.id_alumn = ?;',
      [idAlumno]
    )
    const [notas] = await connection.query(
      'SELECT DISTINCT fn.id_tema, ci.ciclo, fn.nota_eva_escrita, fn.nota_eva_oral, fn.nota_final, ne.puntos_contenido, ne.puntos_estructura, ne.puntos_hab_comu, ne.puntos_tiempo FROM alumno_horario ah JOIN horario h ON h.id_horario = ah.id_horario JOIN ciclo ci ON ci.id_ciclo = h.ciclo_id JOIN curso c ON c.id_curso = h.id_curso JOIN tema t ON t.id_curso_pertenece = c.id_curso JOIN ficha_nota fn on ci.id_ciclo = fn.id_ciclo JOIN nota_exposicion ne on fn.id_ficha_nota = ne.id_ficha_nota WHERE h.estado = "finalizado" AND ah.id_alumn = ?;',
      [idAlumno]
    )
    return [curso, temas, notas]
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = { createNotesForAll, getCourseCompletedByAlumn }
