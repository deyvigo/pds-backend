const { connection } = require('../services/connection.bd')

const getAll = async () => {
  try {
    const [alumnos] = await connection.query(
      'SELECT id_alumno, nombres, apellidos, nivel, username, password, rol FROM alumno a JOIN rol r ON a.al_rol = r.id_rol;'
    )
    return alumnos
  } catch (e) {
    console.error(e)
    throw e
  }
}

// Mañana verificar que el user no exista

const insertOne = async ({ nombres, apellidos, nivel, username, hashPass, rol }) => {
  try {
    await connection.execute(
      'INSERT INTO alumno (nombres, apellidos, nivel, username, password, al_rol) VALUES (?,?,?,?,?);',
      [nombres, apellidos, nivel, username, hashPass, rol]
    )
    return JSON.stringify({ response: 'Registro exitoso' })
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = { getAll, insertOne }
