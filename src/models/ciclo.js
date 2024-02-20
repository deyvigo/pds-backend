const { connection } = require('./../services/connection.bd')

const createOne = async ({ ciclo }) => {
  try {
    await connection.query(
      'INSERT INTO ciclo (ciclo) VALUES (?)',
      [ciclo]
    )
    return { response: 'Reistro exitoso' }
  } catch (e) {
    console.error(e)
  }
}

const getAll = async () => {
  try {
    const [response] = await connection.query(
      'SELECT * FROM ciclo;'
    )
    return response
  } catch (e) {
    console.error(e)
  }
}

module.exports = { createOne, getAll }
