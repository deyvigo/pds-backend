// Este módulo proporciona una función para insertar un nuevo registro de administrador en la base de datos
// Utiliza la conexión establecida en el servicio connection.bd para ejecutar una consulta SQL que inserta
// los datos del nuevo administrador en la tabla administrador.
// La función insertOne recibe como parámetros los datos del administrador (nombres, apellidos, username, hashPass, rol).
// Si la inserción se realiza correctamente, devuelve un objeto con un mensaje de confirmación.
// En caso de error durante la ejecución de la consulta, registra el error en la consola y lo relanza para ser manejado externamente.

const { connection } = require('../services/connection.bd')

const insertOne = async ({ nombres, apellidos, username, hashPass, rol }) => {
  try {
    await connection.execute(
      'INSERT INTO administrador (nombres, apellidos, username, password, ad_rol) VALUES (?,?,?,?,?)',
      [nombres, apellidos, username, hashPass, rol]
    )
    return { response: 'Registro exitoso' }
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getAllAdmin = async () => {
  try {
    const [admin] = await connection.query(
      'SELECT id_administrador, nombres, apellidos FROM administrador;'
    )
    return admin
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = { insertOne, getAllAdmin }
