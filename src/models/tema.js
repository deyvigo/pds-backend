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

const getAllWithTheme = async () => {
  try {
    const [response] = await connection.query(
      'SELECT t.id_curso_pertenece, t.id_tema, t.nombre, t.descripcion FROM tema t JOIN curso c ON t.id_curso_pertenece = c.id_curso ORDER BY c.nombre;'
    )
    return response
  } catch (e) {
    console.error(e)
  }
}

module.exports = { insertOne, getAllWithTheme }
