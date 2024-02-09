const { Router } = require('express')
const { readdirSync } = require('fs')

const PATH_DIR = `${__dirname}`

const router = Router()

const cleanFileName = (filename) => {
  return filename.split('.').shift()
}

readdirSync(PATH_DIR).forEach((f) => {
  const cleanName = cleanFileName(f)
  if (cleanName !== 'index') {
    router.use(`/${cleanName}`, require(`./${cleanName}`))
    console.log(`Loading ....... /${cleanName}`)
  }
})

module.exports = router
