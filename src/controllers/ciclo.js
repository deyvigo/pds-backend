const { createOne, getAll } = require('./../models/ciclo')

const createCicle = async (req, res) => {
  const { ciclo } = req.body
  const response = await createOne({ ciclo })
  res.send(response)
}

const getAllCicles = async (req, res) => {
  const response = await getAll()
  res.send(response)
}

module.exports = { createCicle, getAllCicles }
