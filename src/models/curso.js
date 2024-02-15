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

const getAll = async () => {
  try {
    const [data] = await connection.query(
      'SELECT c.id_curso, c.nombre, c.codigo_curso, c.nivel, c1.nombre as requisito, a.nombres as nombre_creador FROM curso c LEFT JOIN curso c1 ON c.id_requisito = c1.id_curso JOIN administrador a ON a.id_administrador = c.id_creador_curso;'
    )
    return data
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = { createOne, getAll }
