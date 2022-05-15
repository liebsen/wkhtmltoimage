const express = require('express')
const app = express()
const path = require("path")
const cors = require("cors")
const wkhtmltoimage = require('wkhtmltoimage')
const uploads_folder = '/captures/'
const port = 5555

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/index.html`))
})

app.post('/capture', (req, res) => {
  var url = req.body.url
  var success = false
  var filename = ''
  var filepath = ''
  if (url) {
    filename = url.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    filepath = path.join(`${__dirname}${uploads_folder}${filename}.jpg`)
    wkhtmltoimage.generate(url, { output: filepath })
    success = true
  }
  res.json({
    success: success,
    filename: `${filename}.jpg`
  })
})

app.listen(port, () => {
  console.log(`App listening to ${port}`)
})