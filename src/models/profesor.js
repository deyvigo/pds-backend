const { connection } = require('../services/connection.bd')

const getAll = async () => {
  try {
    const [profesores] = await connection.query(
      'SELECT id_profesor, nombres, apellidos, username, password, estado, id_autorizante, rol FROM profesor p JOIN rol r ON p.pr_rol = r.id_rol;'
    )
    return profesores
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
    return JSON.stringify({ response: 'Registro exitoso' })
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = { getAll, insertOne }
