const { compare, hash } = require('bcrypt')

const encryptPass = async (pass) => {
  const hashPass = await hash(pass, 10)
  return hashPass
}

const comparePass = async (plainP, hashP) => {
  return await compare(plainP, hashP)
}

module.exports = { encryptPass, comparePass }
