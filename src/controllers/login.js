const { getAlumn, getTeacher, getAdmin } = require('../models/login')
const { comparePass } = require('../helpers/bcrypt')

const loginAlumn = async (req, res) => {
  const { username, password } = req.body
  const response = await getAlumn(username)
  // console.log(response.length)
  if (response.length === 0) {
    res.status(404)
    res.send({ error: 'User not found' })
    return
  }
  const checkPass = await comparePass(password, response[0].password)
  if (checkPass) {
    res.send({ data: response })
  } else {
    res.status(409)
    res.send({ error: 'Invalid Password' })
  }
}

const loginTeacher = async (req, res) => {
  const { username, password } = req.body
  const response = await getTeacher(username)
  if (response.length === 0 || response[0].estado === 0) {
    res.status(404)
    res.send({ error: 'User not found' })
    return
  }
  const checkPass = await comparePass(password, response[0].password)
  if (checkPass) {
    res.send({ data: response })
  } else {
    res.status(409)
    res.send({ error: 'Invalid Password' })
  }
}

const loginAdmin = async (req, res) => {
  const { username, password } = req.body
  const response = await getAdmin(username)
  // console.log(response.length)
  if (response.length === 0) {
    res.status(404)
    res.send({ error: 'User not found' })
    return
  }
  const checkPass = await comparePass(password, response[0].password)
  if (checkPass) {
    res.send({ data: response })
  } else {
    res.status(409)
    res.send({ error: 'Invalid Password' })
  }
}

module.exports = { loginAlumn, loginTeacher, loginAdmin }
