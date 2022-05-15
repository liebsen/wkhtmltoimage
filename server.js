const express = require('express')
const app = express()
const path = require("path")
const wkhtmltoimage = require('wkhtmltoimage')
const uploads_folder = 'captures'
const port = 5555

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/index.html`))
})

app.post('/shot', (req, res) => {
  var url = req.body.url
  var success = false
  if (url) {
    var filename = url.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    wkhtmltoimage.generate(url, { output: path.join(`${__dirname}/${uploads_folder}/${filename}.jpg`) })
    success = true
  }
  res.json({ success: success })
})

app.listen(port, () => {
  console.log(`App listening to ${port}`)
})