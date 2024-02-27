require('dotenv').config()
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT ?? 3000

const app = express()

app.use(cors())

app.use(express.json())

app.use('/', require('./routes/index'))

app.listen(PORT, () => {
  console.log(`Server ready on: http://localhost:${PORT}`)
})
