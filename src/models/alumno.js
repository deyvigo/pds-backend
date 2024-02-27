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

const changeLevelById = async (nivel, values) => {
  try {
    const response = await connection.query(
      'UPDATE alumno SET nivel = ? WHERE id_alumno IN (?);',
      [nivel, values]
    )
    return response
  } catch (e) {
    console.error(e)
  }
}

const getById = async ({ idAlumno }) => {
  try {
    const [response] = await connection.query(
      'SELECT a.id_alumno, a.nombres, a.apellidos, a.nivel FROM alumno a WHERE id_alumno = ?;',
      [idAlumno]
    )
    return response
  } catch (e) {
    console.error(e)
  }
}

const getAllByIdCourseAndIdProfesor = async ({ idCurso, idProfesor }) => {
  try {
    const [response] = await connection.query(
      'SELECT DISTINCT(ah.id_alumn), a.nombres, a.apellidos, h.id_curso, ci.id_ciclo, ci.ciclo FROM profesor p JOIN horario h ON p.id_profesor = h.id_profesor_cargo JOIN alumno_horario ah ON h.id_horario = ah.id_horario JOIN alumno a ON a.id_alumno = ah.id_alumn JOIN ciclo ci ON ci.id_ciclo = h.ciclo_id WHERE p.id_profesor = ? AND h.id_curso = ?;',
      [idProfesor, idCurso]
    )
    return response
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = { getAll, insertOne, changeLevelById, getById, getAllByIdCourseAndIdProfesor }
