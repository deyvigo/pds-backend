const { createPool } = require('mysql2/promise')

const connection = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // No olvidar el puerto
  multipleStatements: true
})

module.exports = { connection }
