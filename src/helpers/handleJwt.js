const { verify, sign } = require('jsonwebtoken')

// Obtenemos la clave para firmar los tokens JWT desde las variables de entorno.
const TOKEN_SECRET = process.env.TOKEN_SIGN

const createJwt = async ({ id, username, rol }) => {
  // firmamos los datos del usuario
  const signUser = await sign(
    {
      id,
      username,
      rol
    },
    TOKEN_SECRET
  )
  return signUser // devolvemos el token
}

// Esta es una función para verificar un token JWT.
const verifyJwt = async (jwtToken) => {
  try {
    // Verificamos el token utilizando la clave secreta.
    return await verify(jwtToken, TOKEN_SECRET)
  } catch (e) {
    // En caso de error, devolvemos el error.
    return e
  }
}

// Exportamos las funciones para que puedan ser utilizadas por otros módulos de la aplicación.
module.exports = { createJwt, verifyJwt }
