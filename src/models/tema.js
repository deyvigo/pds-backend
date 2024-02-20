const { connection } = require('./../services/connection.bd')

const insertOne = async ({ idCurso, nombre, descripcion }) => {
  try {
    await connection.execute(
      'INSERT INTO tema (id_curso_pertenece, nombre, descripcion) VALUES (?,?,?);',
      [idCurso, nombre, descripcion]
    )
    return { response: 'Registro exitoso' }
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getByIdCourse = async ({ idCurso }) => {
  try {
    const [response] = await connection.query(
      'SELECT id_tema, nombre, descripcion FROM tema WHERE id_curso_pertenece = ?;',
      [idCurso]
    )
    return response
  } catch (e) {
    console.error(e)
  }
}

module.exports = { insertOne, getByIdCourse }
