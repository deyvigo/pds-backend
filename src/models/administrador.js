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

module.exports = { insertOne }
