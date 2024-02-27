const { Canvas, loadImage, loadFont } = require('canvas-constructor/napi-rs')
const { resolve, join } = require('path')

const obtainCertificate = async (req, res) => {
  const { id, nombres, fechaInicio, fechaFinal } = req.body

  const meses = {
    '01': 'Enero',
    '02': 'Febrero',
    '03': 'Marzo',
    '04': 'Abril',
    '05': 'Mayo',
    '06': 'Junio',
    '07': 'Julio',
    '08': 'Agosto',
    '09': 'Septiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre'
  }

  const anho = fechaInicio.split('-')[0]

  const mesInicio = fechaInicio.split('-')[1]
  const mesFinal = fechaFinal.split('-')[1]

  const fechaActual = new Date().toISOString().split('T')[0]
  const image = await loadImage(`./src/images/discipulado-${id}.png`)

  loadFont(resolve(join(__dirname, './../font/BobbyJonesSoft.otf')), 'Bobby Jones Soft')

  const img = new Canvas(1170, 827)
    .printImage(image, 0, 0, 1170, 827)
    .setTextAlign('center')
    .setTextFont('22px Bobby Jones Soft')
    .printText(nombres, 540, 335)
    .printText(fechaInicio.split('-')[2], 760, 390)
    .printText(fechaFinal.split('-')[2], 950, 390)
    .printText(anho, 415, 435)
    .printText(fechaActual, 850, 510)
    .setTextFont('20px Bobby Jones Soft')
    .printText(meses[`${mesInicio}`], 860, 390)
    .printText(meses[`${mesFinal}`], 290, 435)
    .png()

  res.set({ 'Content-Type': 'image/png' })
  res.send(img)
}

module.exports = { obtainCertificate }
