const { createAsistForAll } = require('./../models/asistencia')

const createAsist = async (req, res) => {
  const { data } = req.body
  console.log(data)
  const values = data.map(d => ([
    d.idAlumno, d.idHorario, d.asistencia, d.fecha
  ]))
  console.log(values)
  const response = await createAsistForAll(values)
  res.send(response)
}

module.exports = { createAsist }
