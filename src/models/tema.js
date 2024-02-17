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

module.exports = { insertOne }
