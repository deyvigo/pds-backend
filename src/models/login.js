const { connection } = require('../services/connection.bd')

const getAlumn = async (username) => {
  try {
    const [alumno] = await connection.query(
      'SELECT id_alumno as id, nombres, apellidos, username, password, nivel, rol FROM alumno a JOIN rol r ON a.al_rol = r.id_rol WHERE username = ?;',
      [username]
    )
    return alumno
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getTeacher = async (username) => {
  try {
    const [profesor] = await connection.query(
      'SELECT id_profesor as id, nombres, apellidos, username, password, estado, id_autorizante, rol FROM profesor p JOIN rol r ON p.pr_rol = r.id_rol WHERE username = ?;',
      [username]
    )
    return profesor
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getAdmin = async (username) => {
  try {
    const [admin] = await connection.query(
      'SELECT id_administrador as id, nombres, apellidos, username, password, rol FROM administrador a JOIN rol r ON a.ad_rol = r.id_rol WHERE username = ?;',
      [username]
    )
    return admin
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = { getAlumn, getTeacher, getAdmin }
