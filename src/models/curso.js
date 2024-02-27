const { connection } = require('./../services/connection.bd')

const createOne = async ({ codigo, nombre, nivel, requisito, idCreador }) => {
  try {
    await connection.query(
      'INSERT INTO curso (codigo_curso, nombre, nivel, id_requisito, id_creador_curso) VALUES (?,?,?,?,?)',
      [codigo, nombre, nivel, requisito, idCreador]
    )
    return { response: 'Registro exitoso' }
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getAllCourses = async () => {
  try {
    const [curso] = await connection.query(
      'SELECT c.id_curso, c.nombre, c.codigo_curso, c.nivel, c1.nombre as requisito, c.id_creador_curso FROM curso c LEFT JOIN curso c1 ON c.id_requisito = c1.id_curso JOIN administrador a ON a.id_administrador = c.id_creador_curso;'
    )
    // const [profesor] = await connection.query(
    //   'SELECT a.id_administrador,a.nombres, a.apellidos FROM curso c LEFT JOIN curso c1 ON c.id_requisito = c1.id_curso JOIN administrador a ON a.id_administrador = c.id_creador_curso;'
    // )
    return curso
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getAllCoursesByIdProfesor = async ({ idProfesor }) => {
  try {
    const [response] = await connection.query(
      'SELECT DISTINCT(c.nombre) as curso, p.nombres as profesor, c.id_curso, p.id_profesor FROM horario h JOIN profesor p ON p.id_profesor = h.id_profesor_cargo JOIN curso c ON c.id_curso = h.id_curso WHERE p.id_profesor = ? AND h.estado = "en curso";',
      [idProfesor]
    )
    return response
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = { createOne, getAllCourses, getAllCoursesByIdProfesor }
