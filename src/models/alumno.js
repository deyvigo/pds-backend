/*
getAll -> Obtiene todos los alumnos de la base de datos con sus respectivos datos.
insertOne -> Inserta un nuevo alumno en la base de datos.
changeLevelByUsername -> Actualiza el nivel de un alumno en la base de datos según su nombre de usuario. */

const { connection } = require('../services/connection.bd')

const getAll = async () => {
  try {
    const [alumnos] = await connection.query(
      'SELECT id_alumno, nombres, apellidos, nivel, username, rol FROM alumno a JOIN rol r ON a.al_rol = r.id_rol;'
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
      'INSERT INTO alumno (nombres, apellidos, nivel, username, password, al_rol) VALUES (?,?,?,?,?,?);',
      [nombres, apellidos, nivel, username, hashPass, rol]
    )
    return { response: 'Registro exitoso' }
  } catch (e) {
    console.error(e)
    throw e
  }
}

const changeLevelByUsername = async ({ username, level }) => {
  try {
    await connection.execute(
      'UPDATE alumno SET nivel = ? WHERE username = ?;',
      [level, username]
    )
    return { response: 'Level updated' }
  } catch (e) {
    console.error(e)
  }
}

module.exports = { getAll, insertOne, changeLevelByUsername }
