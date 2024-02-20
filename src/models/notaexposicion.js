const { connection } = require('./../services/connection.bd')

const createExposicionNotesForAll = async (values) => {
  try {
    await connection.query(
      'INSERT INTO nota_exposicion (puntos_tiempo, puntos_hab_comu, puntos_estructura, puntos_contenido, id_ficha_nota) VALUES ?;',
      [values]
    )
    return { response: 'Registro exitoso' }
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = { createExposicionNotesForAll }
