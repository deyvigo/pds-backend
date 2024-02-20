const { connection } = require('../services/connection.bd')

const getAll = async () => {
  try {
    const [profesores] = await connection.query(
      'SELECT id_profesor, nombres, apellidos, username, estado, id_autorizante, rol FROM profesor p JOIN rol r ON p.pr_rol = r.id_rol;'
    )
    return profesores
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getAllActives = async () => {
  try {
    const [profesor] = await connection.query(
      'SELECT id_profesor, nombres, apellidos FROM profesor WHERE estado = "activo";'
    )
    return profesor
  } catch (e) {
    console.error(e)
    throw e
  }
}

const insertOne = async ({ nombres, apellidos, username, hashPass, estado, rol }) => {
  try {
    await connection.execute(
      'INSERT INTO profesor (nombres, apellidos, username, password, estado, pr_rol) VALUES (?,?,?,?,?,?)',
      [nombres, apellidos, username, hashPass, estado, rol]
    )
    return { response: 'Registro exitoso' }
  } catch (e) {
    console.error(e)
    throw e
  }
}

const updateStatusById = async ({ idProfesor, estado, idAutorizante }) => {
  try {
    await connection.execute(
      'UPDATE profesor SET estado = ?, id_autorizante = ? WHERE id_profesor = ?',
      [estado, idAutorizante, idProfesor]
    )
    return { response: 'successfully updated' }
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = { getAll, insertOne, updateStatusById, getAllActives }
