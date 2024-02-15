const { verify, sign } = require('jsonwebtoken')

const TOKEN_SECRET = process.env.TOKEN_SIGN

const createJwt = async (user) => {
  const signUser = await sign(
    {
      username: user.username,
      role: user.rol
    },
    TOKEN_SECRET
  )
  return signUser
}

const verifyJwt = async (jwtToken) => {
  try {
    return await verify(jwtToken, TOKEN_SECRET)
  } catch (e) {
    return e
  }
}

module.exports = { createJwt, verifyJwt }
