const { connection } = require('./../services/connection.bd')

const createOne = async ({ ciclo, inicio, fin }) => {
  try {
    await connection.query(
      'INSERT INTO ciclo (ciclo, inicio, fin) VALUES (?,?,?)',
      [ciclo, inicio, fin]
    )
    return { response: 'Registro exitoso' }
  } catch (e) {
    console.error(e)
  }
}

const getAll = async () => {
  try {
    const [response] = await connection.query(
      'SELECT id_ciclo, ciclo, inicio, fin FROM ciclo;'
    )
    return response
  } catch (e) {
    console.error(e)
  }
}

module.exports = { createOne, getAll }
