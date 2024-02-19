const { connection } = require('./../services/connection.bd')

const createAsistForAll = async (data) => {
  try {
    await connection.query(
      'INSERT INTO asistencia (id_alumno, id_horario, asistencia, fecha) VALUES ?;',
      [data]
    )
    return { response: 'Registro exitoso' }
  } catch (e) {
    console.error(e)
  }
}

module.exports = { createAsistForAll }
