const express = require('express')
const app = express()
const path = require("path")
const cors = require("cors")
const wkhtmltoimage = require('wkhtmltoimage')
const uploads_folder = 'captures'
const port = 5555

app.use(express.static(path.join(__dirname, 'captures')))
app.use(cors())
app.use(express.json())

wkhtmltoimage.generate('https://google.com/', { output: 'out.jpg' });

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/index.html`))
})

app.post('/capture', (req, res) => {
  console.log(req.body)
  var url = req.body.url
  var success = false
  if (url) {
    var filename = url.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    let filepath = path.join(`${__dirname}/${uploads_folder}/${filename}.jpg`)
    console.log(filename)
    console.log(filepath)
    wkhtmltoimage.generate(url, { output: filepath })
    success = true
  }
  res.json({ success: success })
})

app.listen(port, () => {
  console.log(`App listening to ${port}`)
})